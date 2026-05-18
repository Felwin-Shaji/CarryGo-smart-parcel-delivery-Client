import { useFormik } from "formik";
import { FiEye, FiEyeOff, FiMail, FiPhone, FiUser, FiLock } from "react-icons/fi";
import { useState } from "react";
import logo from "../../../assets/carrygo-logo.png";
import { registrationSchema } from "../../../validation/registration";
import { GoogleLogin } from "@react-oauth/google";
import { roleConfigRegistration } from "../../../context/roleConfigRegistration";

interface RegistrationFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
  }) => void;
  role: string;
  onGoogleSignUp?: (credential: string) => void;
  loading?: boolean;
}



const RegistrationForm = ({
  onSubmit,
  onGoogleSignUp,
  loading,
  role,
}: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const config = roleConfigRegistration[role as "user" | "agency"];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role,
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, role });
    },
  });

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${config.pageBg} flex items-center justify-center px-4 py-10 font-[Inter] overflow-hidden relative`}
    >

      {/* Background Glow */}
      <div
        className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl ${config.glow}`}
      />

      <div
        className={`w-full max-w-6xl rounded-[36px] overflow-hidden ${config.cardBg} shadow-[0_20px_80px_rgba(0,0,0,0.25)] grid md:grid-cols-2 relative z-10`}
      >

        {/* LEFT SIDE */}
        <div
          className={`hidden md:flex relative flex-col justify-between bg-gradient-to-br ${config.leftBg} p-12 overflow-hidden`}
        >

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-black/10 blur-2xl" />

          {/* Top */}
          <div className="relative z-10">

            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
            >
              {config.badge}
            </div>

            {/* Hero */}
            <h1 className="text-5xl font-black text-white leading-tight max-w-md">
              {config.heroTitle}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mt-6 max-w-md">
              {config.heroText}
            </p>
          </div>

          {/* Bottom Logo */}
          <div className="relative z-10 flex flex-col items-start">

            <img
              src={logo}
              alt="CarryGo Logo"
              className="w-[240px] object-contain drop-shadow-2xl"
            />

            <div className="mt-6 flex items-center gap-3">

              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/30 border border-white/30" />
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30" />
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30" />
              </div>

              <p className="text-white/70 text-sm">
                Trusted by thousands of deliveries daily
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`p-8 md:p-14 flex items-center ${role === "agency"
            ? "bg-[#0F172A]/70"
            : "bg-white/80"
            } backdrop-blur-xl`}
        >

          <form
            onSubmit={formik.handleSubmit}
            className="w-full"
          >

            {/* Heading */}
            <div className="mb-10">

              <h2
                className={`text-4xl font-bold ${config.heading}`}
              >
                {config.title}
              </h2>

              <p
                className={`mt-3 text-base leading-relaxed ${config.subtext}`}
              >
                {config.subtitle}
              </p>
            </div>

            {/* Login Link */}
            <p className={`text-sm mb-8 ${config.subtext}`}>
              Already have an account?{" "}

              <a
                href={config.loginLink}
                className={`font-semibold ${config.accent} hover:underline`}
              >
                {config.loginText}
              </a>
            </p>

            {/* Name */}
            <div className="mb-5">
              <div className="relative">

                <FiUser
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className={`
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  outline-none
                  transition-all
                  focus:ring-4
                  ${config.input}
                `}
                />
              </div>

              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <div className="relative">

                <FiMail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={`
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  outline-none
                  transition-all
                  focus:ring-4
                  ${config.input}
                `}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="mb-5">
              <div className="relative">

                <FiPhone
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                />

                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  className={`
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  outline-none
                  transition-all
                  focus:ring-4
                  ${config.input}
                `}
                />
              </div>

              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.mobile}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="relative">

                <FiLock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={`
                  w-full
                  pl-12
                  pr-12
                  py-4
                  rounded-2xl
                  outline-none
                  transition-all
                  focus:ring-4
                  ${config.input}
                `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
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

            {/* Confirm Password */}
            <div className="mb-8">
              <div className="relative">

                <FiLock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className={`
                  w-full
                  pl-12
                  pr-12
                  py-4
                  rounded-2xl
                  outline-none
                  transition-all
                  focus:ring-4
                  ${config.input}
                `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${role === "agency"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
              w-full
              bg-gradient-to-r
              ${config.button}
              ${config.buttonHover}
              text-white
              py-4
              rounded-2xl
              font-semibold
              text-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-2xl
              disabled:opacity-60
            `}
            >
              {loading
                ? "Creating Account..."
                : role === "agency"
                  ? "Register Agency"
                  : "Create Account"}
            </button>

            {/* Google */}
            {onGoogleSignUp && (
              <>
                <div className="flex items-center gap-4 my-8">

                  <div
                    className={`flex-1 h-[1px] ${role === "agency"
                      ? "bg-white/10"
                      : "bg-gray-200"
                      }`}
                  />

                  <span
                    className={`text-xs tracking-[0.2em] ${config.subtext}`}
                  >
                    OR CONTINUE WITH
                  </span>

                  <div
                    className={`flex-1 h-[1px] ${role === "agency"
                      ? "bg-white/10"
                      : "bg-gray-200"
                      }`}
                  />
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (
                        credentialResponse.credential &&
                        onGoogleSignUp
                      ) {
                        onGoogleSignUp(
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
};

export default RegistrationForm;