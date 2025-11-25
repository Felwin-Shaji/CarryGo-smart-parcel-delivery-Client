import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../validation/forgotPassword";
import type { Roles } from "../../constants_Types/types/roles";


interface ForgotPasswordProps {
  title: string;
  onSubmit: (data: { email: string,role:Roles }) => void;
  loading?: boolean;
  role:Roles;
}

const ForgotPasswordForm = ({ title, onSubmit, loading , role}: ForgotPasswordProps) => {
  const formik = useFormik({
    initialValues: { 
        email: "" ,
        role
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => onSubmit(values),
  });

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

        {/* Right Section - Forgot Form */}
        <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center rounded-t-2xl md:rounded-t-none md:rounded-l-[60px] md:rounded-tr-[60px]">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
              {title}
            </h2>
            <p className="text-sm text-[#102467] mb-6 text-center md:text-left">
              Enter the email linked with your account to receive a reset link.
            </p>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className={`w-full border-none rounded-full p-3 focus:outline-none shadow-sm ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : ""
                }`}
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
