import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import logo from "/ewan.jfif"

export default function Landing() {
    const { session } = useAuth()

    const navigate = useNavigate()

    const scrollRef = useRef(null)
    const { scrollY } = useScroll({
        container: scrollRef
    })

    const y = useMotionValue(0)
    const divOpacity = useTransform(scrollY, [0, 300], [1, 0])
    

    useEffect(() => {
        if (session) {
            navigate("/app", { replace: true })
        }
    }, [session])
function LandingDesc() {
    return(
        <div className="flex w-full flex-col justify-center items-start p-2 rounded-xl border-2 border-pink-500/80 bg-neutral-950">
            <h1 className="text-[20px]">Fully customizable notes</h1>
            <span className="font-[15px]">i mean the title couldn't have been more self-explanatory if it tried. you can basically do whatever you want with your notes.</span>
        </div>
    )
}
function DesktopDisplay() {
    return(
        <div>Hi</div>
    )
}

function MobileDisplay() {
    return(
        <motion.div 
            className="flex items-center justify-center fixed inset-0 bg-[url(/landing-bg.png)] bg-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}    
        >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/40 from-20% via-black/95 via-50% to-black to-90%" />

            <div className="flex justify-between items-center fixed top-4 bg-neutral-950 p-4 px-6 w-9/10 rounded-full shadow-xl/30 z-50">
                <div className="flex gap-3 items-center justify-center">
                    <img src={logo} className="size-14 rounded-full border-2 border-r-0 border-white/70" />
                    <h1 className="text-pink-500">Talaan</h1>
                </div>

                <button className="w-auto ring-1 ring-white/80 bg-pink-600 font-bold text-[15px] rounded-full">Sign In</button>
            </div>


          <motion.div 
            ref={scrollRef}
            onScroll={(e) => {
                y.set(e.currentTarget.scrollTop)
            }}
            className="flex flex-col w-screen h-screen px-4 items-center z-40 overflow-y-auto no-scrollbar"
          >
            <motion.div 
                style={{ opacity: divOpacity }}
                className="top-35 opacity-0 relative w-full h-auto flex flex-col gap-4"
            >
                <h1 className="text-[40px] p-0">ginagawa ko pa 'to</h1>
                <span className="text-white/80 text-[13px] text-center">
                    Make your own notes so you don't forget stuff or something idk. 
                    And you can also do some others things as well, 
                    I mean bro just make your own account and see for yourself 
                    like you're not actually gonna make me explain everything right
                </span>

                <div className="flex w-full justify-center items-center gap-2">
                    <Link to='/signin' className="link-base">Sign in</Link>
                    <Link to ='/signup' className="link-base">Sign up</Link>
                </div>
            </motion.div>

            <div className=" flex flex-col gap-5 w-full h-auto relative top-39 pb-2">
                <LandingDesc />
                <LandingDesc />
                <LandingDesc />
                <LandingDesc />
                <LandingDesc />
            </div>
          </motion.div>
        </motion.div>
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
  