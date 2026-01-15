import { Link } from "react-router-dom";

export default function Landing() {

function DesktopDisplay() {
    return(
        <div>Hi</div>
    )
}

function MobileDisplay() {
    return(
        <div>
            <h1 className="text-center text-xl p-5">Welcome</h1>

            <div className="flex justify-between items-center gap-5 mx-2">
                <Link to='/login' className="link-base">Log in</Link>
                <Link to ='/signup' className="link-base">Sign up</Link>
            </div>
        </div>
    )
}
    return(
        <>
            <div className="block md:hidden w-full">
                <MobileDisplay />
            </div>

            <div className="hidden md:block w-full">
                <DesktopDisplay />
            </div>
        </>
    )
}