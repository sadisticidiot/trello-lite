import { useNavigate } from "react-router-dom"

export default function Groups() {
    const navigate = useNavigate()

    return(
        <>
        <button onClick={() => navigate('/')}>Go back</button>
        <h1>hello twin</h1>
        </>
    )
}