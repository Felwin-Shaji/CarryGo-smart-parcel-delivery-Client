import { useFormik } from "formik";
import type { Roles } from "../../constants_Types/types/roles";
import logo from "../../../assets/carrygo-logo.png";
import { forgotPasswordSchema } from "../../../validation/forgotPassword";
import { loginTheme } from "../../../context/loginTheme";
import LoadingScreen from "../loading/CarryGoLoadingScreen";

interface ForgotPasswordProps {
    title: string;
    onSubmit: (data: { email: string; role: Roles }) => void;
    loading?: boolean;
    role: Roles;
}

const ForgotPasswordForm = ({
    title,
    onSubmit,
    loading,
    role,
}: ForgotPasswordProps) => {

    const theme = loginTheme[role as Roles] || loginTheme.user;

    const formik = useFormik({
        initialValues: {
            email: "",
            role,
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => onSubmit(values),
    });

    if (loading) return <LoadingScreen />;

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
                            Recover your account securely and continue accessing
                            CarryGo services.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                    className={`${theme.cardBg} backdrop-blur-xl p-8 md:p-14 flex items-center`}
                >
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full max-w-md mx-auto"
                    >
                        {/* HEADING */}
                        <div className="mb-8">
                            <h2
                                className={`text-4xl font-bold ${theme.heading}`}
                            >
                                {title}
                            </h2>

                            <p className={`mt-3 text-base ${theme.subtext}`}>
                                Enter the email linked with your account to
                                receive a reset link.
                            </p>
                        </div>

                        {/* EMAIL */}
                        <div className="mb-8">
                            <label
                                className={`block text-sm font-semibold mb-2 ${theme.heading}`}
                            >
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`
                                    w-full rounded-2xl p-4 outline-none transition-all duration-300
                                    ${theme.input}
                                `}
                            />

                            {formik.touched.email &&
                                formik.errors.email && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {formik.errors.email}
                                    </p>
                                )}
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full bg-gradient-to-r ${theme.button}
                                ${theme.buttonHover}
                                text-white py-4 rounded-2xl font-semibold text-lg
                                shadow-xl hover:scale-[1.02]
                                transition-all duration-300 disabled:opacity-60
                            `}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                        {/* BACK */}
                        <div className="mt-6 text-center">
                            <a
                                href="/login"
                                className={`text-sm font-semibold hover:underline ${theme.accent}`}
                            >
                                Back to Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;