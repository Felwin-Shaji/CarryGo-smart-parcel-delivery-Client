import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-[Inter] p-6">

      {/* Logo */}
      <img
        src="\src\assets\carrygo-logo.png"
        alt="CarryGo Logo"
        className="w-40 mb-6 opacity-90"
      />

      {/* Card */}
      <div className="bg-[#FACC15] p-10 rounded-2xl shadow-lg max-w-md w-full text-center">

        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">404</h1>
        <p className="text-[#102467] text-sm mb-6">
          Oops! The page you’re looking for can’t be found.
        </p>

        <Link
          to="/"
          className="bg-[#1E3A8A] text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-[#102467] transition inline-block"
        >
          Go Home
        </Link>
      </div>

    </div>
  );
};

export default PageNotFound;
