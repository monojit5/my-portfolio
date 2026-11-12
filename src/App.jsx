import World from './world/World.jsx'
import Nav from './ui/Nav.jsx'
import Overlay from './ui/Overlay.jsx'
import SideDots from './ui/SideDots.jsx'
import ProjectModal from './ui/ProjectModal.jsx'
import Loader from './ui/Loader.jsx'

export default function App() {
  return (
    <>
      <div className="stage" aria-hidden="true">
        <World />
      </div>
      <Nav />
      <SideDots />
      <Overlay />
      <ProjectModal />
      <Loader />
    </>
  )
}
