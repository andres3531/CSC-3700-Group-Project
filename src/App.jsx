import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx";
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </>
    )
}

export default App