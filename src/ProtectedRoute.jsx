import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Interface from "./ui/Interface";
export default function ProtectedRoute(){
    const { loading, session } = useAuth()

    if (loading) {
        return(
            <Interface>
                <span className="spinner" />
            </Interface>
        )
    }

    return session ? <Outlet /> : <Navigate to="/" replace />
}