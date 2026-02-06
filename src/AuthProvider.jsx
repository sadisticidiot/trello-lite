import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./data/supabase-client"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [name, setName] = useState(null)
    const [posts, setPosts] = useState([])

    const [profileLoading, setProfileLoading] = useState(true)
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        const getPosts = async (userId) => {
            const { data, error } = await supabase
                .from("posts")
                .select("title, post, created_at")
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

    useEffect(() => {
        supabase.auth.getSession().then(({ data: {session} }) => {
        setSession(session)
        setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
        
        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading, profile, name, profileLoading, posts }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}