import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'
import { useAuthRehydration } from './hooks/useAuthRehydration ';
import LoadingScreen from './components/loading/CarryGoLoadingScreen';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  const loading = useAuthRehydration();
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster toastOptions={{ style: { background: "#1E3A8A", color: "#fff" } }} />
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </>
  )
}

export default App
