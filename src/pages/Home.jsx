import HomeHeader from "../ui/HomeHeader"
import Notes from "./Notes"
import Groups from "./Groups"
import HomePages from "../ui/HomePages"
import { useOutletContext } from "react-router-dom"
import clsx from "clsx"

export default function Home() {
  const { isFooter } = useOutletContext()

  const pages = [
    { path: '/', element: <Notes /> },
    { path: '/groups', element: <Groups />},
  ]
  
  const currentPage = 
    pages.find(page => location.pathname === page.path)?.element 
    ?? <Notes />

  return (
    <div className="flex flex-col md:flex-row h-dvh">
      <HomeHeader />

        <HomePages pages={pages} />

      <div className={clsx(
        "hidden md:block flex-1",
        isFooter ? "pb-11" : "p-0"
      )}>
        {currentPage}
      </div>
    </div>
  )
}