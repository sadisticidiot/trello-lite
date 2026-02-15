import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./data/supabase-client"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [name, setName] = useState(null)
    const [activeNote, setActiveNote] = useState(null)
    const [posts, setPosts] = useState([])

    const [profileLoading, setProfileLoading] = useState(true)
    const [loading, setLoading] = useState(true)

    // fetch user's info from users table
    useEffect(() => {
        const getInfo = async (userId) => {
            const { data, error } = await supabase
                .from("users")
                .select("display_name, gender, avatar_url")
                .eq("user_id", userId)
                .single()
    
            if (error) {
                console.error(error.message)
                return
            } else {
                setName(data.display_name)
                setProfile(data.avatar_url)
                setProfileLoading(false)
            }
        }
        if (session?.user && !profile) {
            getInfo(session.user.id)
        }
    }, [session])

    // fetch user's posts from posts table
    useEffect(() => {
        const getPosts = async (userId) => {
            const { data, error } = await supabase
                .from("posts")
                .select("id, title, post, created_at, is_pinned, is_archived")
                .eq("user_id", userId)
                .order("created_at", { ascending: false })

            if (error) {
                console.error(error.message)
            } else {
                setPosts(data)
            }
        }
        if (session?.user) {
            getPosts(session.user.id)
        }
    }, [session])

    // get user's session
    useEffect(() => {
        supabase.auth.getSession().then(({ data: {session} }) => {
            setSession(session)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
        })
        
        return () => subscription.unsubscribe()
    }, [])

    // subscribe for real time updates
    useEffect(() => {
        if (!session?.user) return

        const channel = supabase
            .channel("posts-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "posts",
                    filter: `user_id=eq.${session.user.id}`,
                },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setPosts(prev => {
                            const withoutOptimistic = prev.filter(p => !p.optimistic)
                            return [payload.new, ...withoutOptimistic]
                        })
                    }
                    if (payload.eventType === "UPDATE") {
                        setPosts(prev => prev.map(p =>
                            p.id === payload.new.id ? payload.new : p
                        ))
                    }
                    if (payload.eventType === "DELETE") {
                        setPosts(prev => prev.filter(p =>
                            p.id !== payload.old.id
                        ))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [session])

    const logout = async () => {
        await supabase.auth.signOut()
        setSession(null)
        setProfile(null)
        setName(null)
        setPosts([])
        setActiveNote(null)
    }

    const guestSession = {
    id: 'guest-123',
    type: 'guest',
    name: 'Guest'
    };

    return (
        <AuthContext.Provider 
        value={{ session, loading, profile, 
        name, profileLoading, posts, setPosts,
        activeNote, setActiveNote, logout,
        guestSession}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}