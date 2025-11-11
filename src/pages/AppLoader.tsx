// import { useState, useEffect } from "react";
// import LoadingScreen from "../components/loading/CarryGoLoadingScreen";
// // import MainApp from "./MainApp"; // Replace this with your actual main app component
// import RegistrationPage from "./User/RegistrationPage";

// export default function AppLoader() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 5000); // Simulate loading time
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {loading ? <LoadingScreen /> : <RegistrationPage />}
//     </>
//   );
// }
