import { useFormik } from "formik";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { resetPasswordSchema } from "../../validation/forgotPassword";
import type { Roles } from "../../constants_Types/types/roles";
import { useParams } from "react-router-dom";


interface ResetPasswordProps {
    title: string;
    onSubmit: (token: string, data: { password: string,role:Roles }) => void;
    loading?: boolean;
    role: Roles
}

const ResetPasswordForm = ({ title, onSubmit, loading, role }: ResetPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams<{ token: string }>();
    const decodedToken = decodeURIComponent(token!);
    if (!decodedToken) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600 font-bold text-xl">
                Invalid reset password link.
            </div>
        );
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            role
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => onSubmit(decodedToken,values),
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Inter] p-4 md:p-8">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl max-w-5xl w-full mx-auto md:rounded-tr-[60px]">

                {/* Left Section */}
                <div className="bg-gray-100 flex justify-center items-center w-full md:w-1/2 p-6 md:p-10">
                    <img
                        src="\src\assets\carrygo-logo.png"
                        alt="CarryGo Logo"
                        className="max-w-[250px] md:max-w-[300px] w-full object-contain"
                    />
                </div>

                {/* Right Section */}
                <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center rounded-t-2xl md:rounded-l-[60px] md:rounded-tr-[60px]">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full max-w-sm mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
                            {title}
                        </h2>

                        {/* Password Field */}
                        <div className="mb-6 relative mt-4">
                            <label className="block text-sm font-semibold text-[#111827] mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm"
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
                        >
                            {loading ? "Updating..." : "Reset Password"}
                        </button>

                        <p className="text-sm text-[#102467] mt-6 text-center">
                            <a
                                href="/login"
                                className="underline hover:text-[#1E3A8A]"
                            >
                                Back to Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
