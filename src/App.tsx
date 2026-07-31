import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes';
import AgencyRoutes from './Routes/AgencyRoutes';
import HubRoutes from './Routes/HubRoutes';
import ResetLinkSentPage from './pages/ResetLinkSentPage';
import WorkerRoutes from './Routes/WorkerRoutes';
import { ROLES } from './shared/constants_Types/types/roles';
import { useAuthRehydration } from './hooks/useAuthRehydration';
import AppToaster from './shared/components/Toaster/AppToaster';

function App() {

  const location = useLocation();

  const role =
    location.pathname.startsWith('/admin') ? ROLES.ADMIN :
      location.pathname.startsWith('/agency') ? ROLES.AGENCY :
        location.pathname.startsWith('/hub') ? ROLES.HUB :
          location.pathname.startsWith('/worker') ? ROLES.WORKER :
            ROLES.USER;

  useAuthRehydration(role);


  return (
    <>
      <AppToaster />

      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/agency/*' element={<AgencyRoutes />} />
        <Route path='/hub/*' element={<HubRoutes />} />
        <Route path='/worker/*' element={<WorkerRoutes />} />

        <Route path="/reset-link-sent" element={<ResetLinkSentPage role={role} />} />

      </Routes>
    </>
  )
}

export default App
