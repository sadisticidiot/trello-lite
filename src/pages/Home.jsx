import HomeHeader from "../ui/HomeHeader"
import Notes from "./Notes"
import Groups from "./Groups"
import HomePages from "../ui/HomePages"


export default function Home() {
  const pages = [
    { path: '/', element: <Notes /> },
    { path: '/groups', element: <Groups />},
  ]
 
  return (
    <div className="flex flex-col h-dvh">
      <HomeHeader />

      <HomePages pages={pages} />
    </div>
  )
}