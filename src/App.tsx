import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  // var name = "felwin";

  return (
    <>

    <Toaster toastOptions={{ style: { background: "#1E3A8A", color: "#fff" } }} />
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
      </Routes>
    </>
  )
}

export default App
