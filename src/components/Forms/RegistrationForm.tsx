import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
// import { registrationSchema } from "../validation/registration";
import { useState } from "react";
import logo from "../../assets/carrygo-logo.png"; 
import { registrationSchema } from "../../validation/registration";

interface RegistrationFormProps {
  title: string;
  onSubmit: (data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    role:string;
  }) => void;
  role: string;
  onGoogleSignUp?: () => void;
  loading?: boolean;
}

const RegistrationForm = ({
  title,
  onSubmit,
  onGoogleSignUp,
  loading,
  role
}: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: role,
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", { ...values, role });
      onSubmit({ ...values, role })
    }
  })


  return (
    <div className="flex justify-center items-center max-h-screen bg-gray-100 font-[Inter] p-4 md:p-8">
      <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl max-w-5xl w-full mx-auto md:rounded-tr-[60px]">

        {/* Left Section - Logo */}
        <div className="bg-gray-100 flex justify-center items-center w-full md:w-1/2 p-6 md:p-10">
          <img
            src={logo}
            alt="CarryGo Logo"
            className="max-w-[250px] md:max-w-[300px] w-full object-contain"
          />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center rounded-t-2xl md:rounded-t-none md:rounded-l-[60px] md:rounded-tr-[60px]">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
              {title}
            </h2>
            <p className="text-sm text-[#102467] mb-6 text-center md:text-left">
              Already have an account?{" "}
              <a href="#" className="text-[#1E3A8A] underline font-medium">
                Login here.
              </a>
            </p>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#111827] mb-2">Name</label>
              <input
                type="text"
                className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm h-10"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#111827] mb-2">Email</label>
              <input
                type="text"
                className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm h-10"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="mb-4 flex gap-2 items-center">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#111827] mb-2">Mobile</label>
                <input
                  type="text"
                  className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm h-10"
                  name="mobile"
                  id="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#111827] mb-2">Password</label>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm h-10 pr-10"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="bg-transparent hover:bg-transparent absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#111827] mb-2">Confirm Password</label>
              <div className="mb-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm h-10"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(p => !p)}
                  className="bg-transparent hover:bg-transparent absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center justify-between w-full gap-2">
              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Google Sign Up */}
              {onGoogleSignUp && (
                <button
                  type="button"
                  onClick={onGoogleSignUp}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-[#111827] py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition"
                >
                  <FcGoogle className="text-2xl" />
                  <span>Google</span>
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>

  );
};

export default RegistrationForm;
