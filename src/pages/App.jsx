import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"

export default function App(){
    const { session } = useAuth()    
    const user = session.user

    const [name, setName] = useState(null)
    const [gender, setGender] = useState(null)
    const [loading, setLoading] = useState(true)

    const getInfo = async () => {

        const { data, error } = await supabase
            .from("users")
            .select("display_name, gender")
            .eq("user_id", user.id)
            .single()

        if (error) {
            console.error(error.message)
        } else {
            setName(data.display_name)
            setGender(data.gender)
            setLoading(false)
        }
    }

    const handleOut = async () => {
        await supabase.auth.signOut()
    } 

    useEffect(() => {
        getInfo()
    }, [])

    if (loading) {
        return(
            <div className="fixed inset-0 flex items-center justify-center"><span className="spinner size-8" /></div>
        )
    }

    return(
        <>
            <div className="block md:hidden">
                <h1 className="text-white">Welcome, {name}. You are a {gender}.</h1>
                <button onClick={handleOut}>Log out</button>
            </div>

            <div className="hidden md:block">
                <h1 className="text-white">Welcome, {name}</h1>
            </div>
        </>
    )
}