import { Link, Outlet } from "react-router-dom";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react";

export default function Signup() {

    return(
        <>
            <div className="block md:hidden fixed m-3 inset-0 flex flex-col justify-between">
                <header className="relative my-5 flex gap-2 items-center justify-center pb-2">
                    <Link to='/' className="fixed left-3">
                        <XMarkIcon className="size-[22px]"/>
                    </Link>
                    <h1 className="flex-1">Create your account</h1>
                </header>

                <Outlet key={location.pathname} />

                <footer className="flex-1 flex items-end justify-center">
                    <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                        This is a prototype created by Fizz 
                        <FaceSmileIcon className="size-[15px]"/>
                    </span>
                </footer>
            </div>

            <div className="hidden md:block w-full">
                <div>
                    Hi
                </div>
            </div>
        </>
    )
}