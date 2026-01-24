import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Interface() {
    const location = useLocation()
    const loc = location.pathname

    return(
        <div className="fixed inset-0 p-2 flex flex-col justify-center items-center bg-neutral-900">
            <header className="relative flex w-full items-center justify-center">
                <Link to='/' className="absolute left-3">
                    <XMarkIcon className="size-[15px]"/>
                </Link>

                <h1>
                    { 
                        loc === "/signup" ? "Create your account" 
                        : loc === "/finish-setup" ? "Setup your password" 
                        : loc === "create-account" ? "Finishing touches"
                        : "Sign in"
                    }
                </h1>
            </header>

                <Outlet />

            <footer className="flex items-end justify-center py-1">
                <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                    This is a prototype created by Fizz 
                    <FaceSmileIcon className="size-[15px]"/>
                </span>
            </footer>
        </div>
    )
}