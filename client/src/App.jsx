import { useState } from 'react'


import { Routes, Route } from "react-router-dom"
import path from './utils/path'
import PublicLayout from './pages/public/PublicLayout'
import Home from "./pages/public/Home"
function App() {
    // const [count, setCount] = useState(0)

    return (

        <div className="">
            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
                    <Route path={path.HOME} element={<Home />} />

                </Route>
            </Routes>
        </div>

    )
}

export default App
