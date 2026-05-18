import { useFormik } from "formik";
import { useState, } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../../assets/carrygo-logo.png";
import { loginSchema } from "../../../validation/login";
import { GoogleLogin } from "@react-oauth/google";
import { loginTheme } from "../../../context/loginTheme";
import type { Roles } from "../../constants_Types/types/roles";



interface LoginFormProps {
    title: string;
    onSubmit: (data: { email: string; password: string; role: string }) => void;
    role: string;
    loading?: boolean;
    onGoogleLogin?: (credential: string) => void;
} 


const LoginForm = ({ title, onSubmit, role, loading, onGoogleLogin }: LoginFormProps) => {

    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            onSubmit({ ...values, role })
        }
    })

    const theme = loginTheme[role as Roles]


    return (
        <div
            className={`min-h-screen bg-gradient-to-br ${theme.pageBg} flex items-center justify-center px-4 py-8 overflow-hidden`}
        >
            {/* Main Card */}
            <div
                className={`relative w-full max-w-6xl rounded-[36px] shadow-2xl ${theme.cardBg} grid md:grid-cols-2`}
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
                    className={`hidden md:flex relative flex-col justify-between bg-gradient-to-br ${theme.leftBg} p-12 overflow-hidden`}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-sm font-medium mb-8">
                            {theme.badge}
                        </div>

                        {/* Hero */}
                        <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
                            {theme.heroTitle}
                        </h1>

                        <p className="text-white/80 text-lg leading-relaxed max-w-md">
                            {theme.heroText}
                        </p>
                    </div>

                    {/* Logo */}
                    <div className="relative z-10 flex flex-col items-center">
                        <img
                            src={logo}
                            alt="CarryGo Logo"
                            className="w-[260px] object-contain drop-shadow-2xl"
                        />

                        <p className="mt-4 text-sm text-white/70">
                            Trusted by thousands of deliveries daily
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className={`${theme.cardBg} backdrop-blur-xl p-8 md:p-14 flex items-center`}>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full max-w-md mx-auto"
                    >
                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className={`text-4xl font-bold ${theme.heading}`}>
                                {title}
                            </h2>

                            <p className={`mt-3 text-base ${theme.subtext}`}>
                                Welcome back! Please login to continue.
                            </p>
                        </div>

                        {/* Registration Links */}
                        {(role === "user" || role === "agency") && (
                            <p className={`text-sm mb-8 ${theme.subtext}`}>
                                Don’t have an account?{" "}
                                <a
                                    href={
                                        role === "agency"
                                            ? "/agency/registration"
                                            : "/registration"
                                    }
                                    className={`font-semibold ${theme.accent} hover:underline`}
                                >
                                    Create a new one
                                </a>
                            </p>
                        )}

                        {/* EMAIL */}
                        <div className="mb-5">
                            <label
                                className={`block text-sm font-semibold mb-2 ${theme.heading}`}
                            >
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:ring-4 ${theme.input}`}
                            />

                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-2">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-4">
                            <label
                                className={`block text-sm font-semibold mb-2 ${theme.heading}`}
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full rounded-2xl px-5 py-4 pr-14 outline-none transition-all duration-300 focus:ring-4 ${theme.input}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${theme.accent}`}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>

                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-2">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end mb-8">
                            <a
                                href={
                                    role === "user"
                                        ? "/forgot-password"
                                        : `/${role}/forgot-password`
                                }
                                className={`text-sm font-medium hover:underline ${theme.accent}`}
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r ${theme.button} ${theme.buttonHover} text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* GOOGLE LOGIN */}
                        {onGoogleLogin && (
                            <>
                                {/* Divider */}
                                <div className="flex items-center gap-4 my-8">
                                    <div className="flex-1 h-[1px] bg-gray-200" />

                                    <span className="text-sm text-gray-400 whitespace-nowrap">
                                        OR CONTINUE WITH
                                    </span>

                                    <div className="flex-1 h-[1px] bg-gray-200" />
                                </div>

                                {/* Google */}
                                <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            if (
                                                credentialResponse.credential &&
                                                onGoogleLogin
                                            ) {
                                                onGoogleLogin(
                                                    credentialResponse.credential
                                                );
                                            }
                                        }}
                                        onError={() => {
                                            console.log("Google Login Failed");
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;