import { createPortal } from "react-dom"


export function Overlay({ children }) {
    const el = document.getElementById("overlay-root")
    return createPortal(children, el)
}