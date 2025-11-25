import { Link } from "react-router-dom";

const ResetLinkSentPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Inter] p-4 md:p-8">
      <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl max-w-4xl w-full mx-auto md:rounded-tr-[60px]">

        {/* Left Section - Logo */}
        <div className="bg-gray-100 flex justify-center items-center w-full md:w-1/2 p-6 md:p-10">
          <img
            src="\src\assets\carrygo-logo.png"
            alt="CarryGo Logo"
            className="max-w-[250px] md:max-w-[300px] w-full object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center rounded-t-2xl md:rounded-l-[60px] md:rounded-tr-[60px] text-center">
          
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
            Reset Link Sent!
          </h2>

          <p className="text-[#102467] text-sm mb-6 leading-relaxed px-4">
            If an account exists with the provided email address,<br />
            a password reset link has been sent.
            <br /><br />
            Please check your inbox and follow the link to reset your password.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3271/3271630.png"
            alt="Email Sent"
            className="w-28 mx-auto mb-6 opacity-90"
          />

          <Link
            to="/login"
            className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition inline-block"
          >
            Back to Login
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ResetLinkSentPage;
