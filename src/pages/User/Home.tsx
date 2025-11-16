import { Header } from "./components/Header";

export default function Home() {

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      <Header isLoggedIn={true} />

    </div>
  );
}



