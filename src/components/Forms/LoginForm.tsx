import { useFormik } from "formik";
import { useState, } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "../../validation/login";


interface LoginFormProps {
    title: string;
    onSubmit: (data: { email: string; password: string; role: string }) => void;
    role: string;
    loading?: boolean;
    onGoogleLogin?: () => void;
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


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Inter] p-4 md:p-8">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl max-w-5xl w-full mx-auto md:rounded-tr-[60px]">

                {/* Left Section - Logo */}
                <div className="bg-gray-100 flex justify-center items-center w-full md:w-1/2 p-6 md:p-10">
                    <img
                        src="\src\assets\carrygo-logo.png"
                        alt="CarryGo Logo"
                        className="max-w-[250px] md:max-w-[300px] w-full object-contain"
                    />
                </div>

                {/* Right Section - Login Form */}
                <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center rounded-t-2xl md:rounded-t-none md:rounded-l-[60px] md:rounded-tr-[60px]">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full max-w-sm mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
                            {title}
                        </h2>
                        {/* Registration Link — Only for User & Agency */}
                        {role === "user" && (
                            <p className="text-sm text-[#102467] mb-6 text-center md:text-left">
                                Don’t have an account?{" "}
                                <a
                                    href="/registration"
                                    className="text-[#1E3A8A] underline font-medium"
                                >
                                    Create a new one.
                                </a>
                            </p>
                        )}

                        {role === "agency" && (
                            <p className="text-sm text-[#102467] mb-6 text-center md:text-left">
                                Don’t have an account?{" "}
                                <a
                                    href="/agency/registration"
                                    className="text-[#1E3A8A] underline font-medium"
                                >
                                    Create a new one.
                                </a>
                            </p>
                        )}



                        {/* Email Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-[#111827] mb-2">
                                Enter Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className={`w-full border-none rounded-full p-3 focus:outline-none shadow-sm ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                                    }`}
                                placeholder="michael.joe@xmail.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 relative">
                            <label className="block text-sm font-semibold text-[#111827] mb-2">
                                Enter Your Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`w-full border-none rounded-full p-3 focus:outline-none shadow-sm ${formik.touched.password && formik.errors.password
                                        ? "border-red-500"
                                        : ""
                                        }`}
                                    placeholder="••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span
                                    className="absolute right-4 top-3.5 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </span>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Forgot Password */}
                        <p className="text-sm text-[#102467] mt-4 text-center underline cursor-pointer hover:text-[#1E3A8A]">
                            <a
                                href={role === "user"
                                    ? "/forgot-password"
                                    : `/${role}/forgot-password`
                                }
                            >
                                Forgot Your Password?
                            </a>
                        </p>



                        {/* OR Divider */}
                        {onGoogleLogin && (
                            <>
                                <div className="flex items-center my-4">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <span className="mx-2 text-gray-600 text-sm">OR</span>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>

                                {/* Google Login */}
                                <button
                                    type="button"
                                    onClick={onGoogleLogin}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-full border border-gray-300 font-semibold hover:bg-gray-50 transition"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="Google Logo"
                                        className="w-5 h-5"
                                    />
                                    Continue with Google
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;