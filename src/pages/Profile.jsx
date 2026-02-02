import { useAuth } from "../AuthProvider"
import { Archive, Book, BookmarkIcon, Heart, PencilLine, UserIcon } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"

export default function Profile() {
    const location = useLocation()
    const navigate = useNavigate()

    const { profile, name, profileLoading } = useAuth()  

    const navItems = [
        { name: "posts", path: '/app/profile', icon: Book, label: "Posts" },
        { name: "liked", path: '/app/profile/liked-posts', icon: Heart, label: "Liked Videos" },
        { name: "bookmarked", path: '/app/profile/bookmarked-posts', icon: BookmarkIcon, label: "Bookmarked Icon" },
        { name: "archived", path: '/app/profile/archived', icon: Archive, label: "Archived" },
    ]

    const currentView = navItems
        .slice()
        .sort((a ,b) => b.path.length - a.path.length)
        .find((item) => location.pathname.startsWith(item.path))
        ?.name ?? "home"

    const handleNav = (item) => {
        if (currentView !== item.name) {
            navigate(item.path)
        }
    }

    return(
        <div className="size-full flex flex-col items-center justify-center pt-5">
            <div className="w-full flex flex-col justify-center items-center mb-4 relative">
                {profileLoading 
                    ? (
                        <div className="animate-pulse rounded-full size-25 bg-neutral-800 pb-5" />
                    ) : !profile ? ( 
                        <div className="rounded-full size-25 bg-neutral-900">
                            <UserIcon className="size-full"/>
                            <h1 className="text-[20px] p-0">{name}</h1>
                        </div>
                    ) : ( 
                        <>
                            <img src={profile} width={80} className="rounded-full" />
                            <h1 className="text-[20px] p-0">{name}</h1>
                        </>
                    )
                }

                <PencilLine className="absolute right-4 top-1"/>
            </div>

            <div className="w-full flex items-center justify-between px-8 border-b-1 border-white/40 shadow-lg shadow-neutral-950">
                {navItems.map((item) => (
                    <div key={item.name}>
                        <button
                            onClick={handleNav}
                            aria-label={item.label}
                            className={clsx(
                                "border-0",
                                currentView === item.name
                                ? "text-neutral-100"
                                : "text-neutral-400 hover:bg-neutral-900"
                            )}
                        >
                            <item.icon />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex-1 w-full">
                <Outlet />
            </div>
        </div>
    )
}