import { Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/play" element = {<Game/>}/>
      </Routes>
    </>
  )
}

export default App