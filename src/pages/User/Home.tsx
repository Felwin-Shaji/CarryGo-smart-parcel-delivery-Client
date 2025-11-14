
// import type { RootState } from "@reduxjs/toolkit/query";
import type { RootState } from "../../store/store";
import { Header } from "./components/Header";
import { useSelector } from "react-redux";

export default function Home() {
    const state = useSelector((state: RootState) => state)

   console.log(state,'zzzzzzzzznnnnnnnnnnnnn') 
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      <Header isLoggedIn={true} />

    </div>
  );
}



