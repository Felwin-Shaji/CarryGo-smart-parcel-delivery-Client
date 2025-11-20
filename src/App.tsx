import { Route, Routes } from 'react-router-dom'
import './App.css'
import "leaflet/dist/leaflet.css";
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'
import AdminRoutes from './Routes/AdminRoutes';
import AgencyRoutes from './Routes/AgencyRoutes';

function App() {


  return (
    <>
      <Toaster toastOptions={{ style: { background: "#1E3A8A", color: "#fff" } }} />
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/agency/*' element={<AgencyRoutes />} />
      </Routes>
    </>
  )
}

export default App
