import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousPathname() {
    const location = useLocation()
    const prevPathRef = useRef(null)

    useEffect(() => {
        prevPathRef.current = location.pathname
    }, [location.pathname])

    return prevPathRef.current
}