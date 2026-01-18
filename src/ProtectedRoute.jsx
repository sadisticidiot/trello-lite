import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export default function ProtectedRoute(){
    const { loading, session } = useAuth()

    if (loading) return <span className="spinner" />

    return session ? <Outlet /> : <Navigate to="/" replace />
}