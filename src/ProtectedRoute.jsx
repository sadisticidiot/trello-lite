import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export default function ProtectedRoute(){
    const { session } = useAuth()

    return session ? <Outlet /> : <Navigate to="/" replace />
}