import { Link } from "react-router-dom";
import logo from "../assets/carrygo-logo.png";
// import logo from "../../../assets/carrygo-logo.png";
import { loginTheme } from "../context/loginTheme";
import type { Roles } from "../shared/constants_Types/types/roles";


interface ResetLinkSentPageProps {
    role: Roles;
}

const ResetLinkSentPage = ({ role }: ResetLinkSentPageProps) => {

    const theme = loginTheme[role as Roles] || loginTheme.user;

    return (
        <div
            className={`min-h-screen bg-gradient-to-br ${theme.pageBg} flex items-center justify-center px-4 py-8 overflow-y-auto`}
        >
            {/* MAIN CARD */}
            <div
                className={`relative w-full max-w-5xl rounded-[36px] shadow-2xl overflow-hidden ${theme.cardBg} grid md:grid-cols-2`}
            >
                {/* Glow Effects */}
                <div
                    className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl ${theme.glow}`}
                />

                <div
                    className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl ${theme.glow}`}
                />

                {/* LEFT SIDE */}
                <div
                    className={`hidden md:flex relative flex-col justify-center items-center bg-gradient-to-br ${theme.leftBg} p-12 overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-black/10" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-sm font-medium mb-8 text-white">
                            Password Recovery
                        </div>

                        <img
                            src={logo}
                            alt="CarryGo Logo"
                            className="w-[240px] object-contain drop-shadow-2xl"
                        />

                        <p className="mt-6 text-white/80 text-base leading-relaxed max-w-sm">
                            Your password reset request has been processed securely.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                    className={`${theme.cardBg} backdrop-blur-xl p-8 md:p-14 flex items-center`}
                >
                    <div className="w-full max-w-md mx-auto text-center">

                        {/* ICON */}
                        <div className="mb-8">
                            <div
                                className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${theme.button} flex items-center justify-center shadow-2xl`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* HEADING */}
                        <h2
                            className={`text-4xl font-bold mb-4 ${theme.heading}`}
                        >
                            Reset Link Sent!
                        </h2>

                        {/* MESSAGE */}
                        <p
                            className={`text-base leading-relaxed mb-8 ${theme.subtext}`}
                        >
                            If an account exists with the provided email address,
                            a password reset link has been sent.
                            <br />
                            <br />
                            Please check your inbox and follow the link to reset
                            your password.
                        </p>

                        {/* BUTTON */}
                        <Link
                            to="/login"
                            className={`
                                w-full inline-block bg-gradient-to-r ${theme.button}
                                ${theme.buttonHover}
                                text-white py-4 rounded-2xl font-semibold text-lg
                                shadow-xl hover:scale-[1.02]
                                transition-all duration-300
                            `}
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetLinkSentPage;