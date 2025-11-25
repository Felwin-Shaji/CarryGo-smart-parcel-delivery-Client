import { Route, Routes } from 'react-router-dom'
import './App.css'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'
import AdminRoutes from './Routes/AdminRoutes';
import AgencyRoutes from './Routes/AgencyRoutes';
import HubRoutes from './Routes/HubRoutes';
import ResetLinkSentPage from './pages/ResetLinkSentPage';

function App() {


  return (
    <>
      <Toaster toastOptions={{ style: { background: "#1E3A8A", color: "#fff" } }} />
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/agency/*' element={<AgencyRoutes />} />
        <Route path='/hub/*' element={<HubRoutes />} />
        
    <Route path="/reset-link-sent" element={<ResetLinkSentPage />} />

      </Routes>
    </>
  )
}

export default App
