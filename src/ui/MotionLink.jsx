import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function MotionLink({ variant = "" }) {
    const Motionlink = motion(Link)

    const [holding, setHolding] = useState()

    const labels = {
        login: {
            text: "Don't have an account?",
            loc: "/signup"
        },
        signup: {
            text: "Already have an account?",
            loc: "/signin"
        },
        later: {
            text: "Maybe later",
            loc: "/app"
        },
        password: {
            text: "Create your password",
            loc: "/signup"
        },
    }
    const label = labels[variant].text 
    const location = labels[variant].loc

    return(
        <Motionlink
            to={location}
            onTapStart={() => setHolding(true)}
            onTapCancel={() => setHolding(false)} 
            onTap={() => setHolding(false)} 
            animate={{ 
                scale: holding ? 0.96 : 1,
                color: holding ? "#e7e7e7b2" : "#ffffff"
            }} 
            className="text-sm text-center"
        >
            {label}
        </Motionlink>
    )

}