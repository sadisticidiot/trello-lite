import { useAuth } from "../AuthProvider"
import { Archive, UserRound, BookmarkIcon, Heart, PencilLine, UserIcon } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"

export default function Profile() {
    const { profile, name, profileLoading } = useAuth()  
    const location = useLocation()
    const navigate = useNavigate()


    return(
        <div className="h-full flex flex-col pb-30
        border-2 border-pink-600 justify-center pt-10">
            <div className="flex items-center justify-center">
                {profileLoading ? (
                    <div className="animate-pulse bg-neutral-600
                    rounded-full" />
                ) : (
                    <div className="flex flex-col items-center
                    justify-center gap-2">
                        <img src={profile} className="rounded-full
                        size-20"/>
                        <span className="text-md">{name}</span>
                    </div>
                )}
            </div>

            <div className="grid grid-row-3 p-4 flex-1 gap-4">
                <div className="flex gap-4">
                    <div className="flex-1 statistics-base"></div>
                    <div className="flex-1 statistics-base"></div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 statistics-base"></div>
                    <div className="flex-1 statistics-base"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex-1 statistics-base"></div>
                </div>
            </div>
        </div>

    )
}