import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function NewPost() {
    return(
        <div className="size-full flex flex-col justify-center items-center p-5">
            <header className="relative flex w-full items-center justify-center">
                <Link to='/' className="absolute left-2">
                    <XMarkIcon className="size-[15px]" />
                </Link>
                <h1>New Post</h1>
            </header>
            <div className="flex-1 size-full bg-neutral-950 rounded shadow-lg">

            </div>
        </div>
    )
}