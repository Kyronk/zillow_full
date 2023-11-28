import { useState } from 'react'


import { Routes, Route } from "react-router-dom"
import path from './utils/path'
// import PublicLayout from './pages/public/PublicLayout'
// import Home from "./pages/public/Home"
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search   } from './pages/public'
import { Modal } from './components'
function App() {
    // const [count, setCount] = useState(0)

    return (

        <div className="">
            <Modal  className=""/>

            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.ABOUT_US} element={<AboutUs />} />
                    <Route path={path.OUT_AGENTS} element={<OurAgents />} />
                    <Route path={path.PROPERTIES} element={<Properties />} />
                    <Route path={path.SEARCH} element={<Search />} />
                    

                </Route>
            </Routes>
        </div>

    )
}

export default App
