import { useAuth } from "../AuthProvider"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useEffect } from "react"

export default function Profile() {
    const { insertsToday, profile, name, profileLoading } = useAuth()

    if (insertsToday === null) return null

    return(
        <div className="h-full flex flex-col
        pb-30 justify-center pt-10">
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

            <div className="grid grid-rows-3 grid-cols-2 p-4 flex-1 gap-4">
                <div className="statistics-base
                row-span-2">
                    <h1>Notes posted today:</h1>
                    <span>{insertsToday}</span>
                </div>
                <div className="statistics-base">
                    <h1>Notes posted this month:</h1>
                </div>
                <div className="statistics-base">
                    <h1>Total notes posted:</h1>
                </div>
                <div className="statistics-base
                col-span-2">
                    <h1>Likes:</h1>
                </div>
            </div>
        </div>

    )
}