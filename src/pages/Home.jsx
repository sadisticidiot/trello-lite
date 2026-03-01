import { Outlet } from "react-router-dom"
import HomeHeader from "../ui/HomeHeader"

export default function Home() {
  return (
    <div className="flex flex-col h-dvh">
      <HomeHeader />

      <div className="flex-1 flex flex-col pb-12 overflow-y-auto">
        <div className="shrink-0 h-3" />
        <Outlet />
      </div>
    </div>
  )
}