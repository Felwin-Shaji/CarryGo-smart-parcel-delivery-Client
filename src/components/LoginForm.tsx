import { useState, type FormEvent } from "react";

interface LoginFormProps {
    title: string;
    onSubmit: (email: string, password: string) => void;
    loading?: boolean;
};

const LoginForm = ({ title, onSubmit, loading }: LoginFormProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    }


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
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
                            {title}
                        </h2>
                        <p className="text-sm text-[#102467] mb-6 text-center md:text-left">
                            Do not have an account?{" "}
                            <a href="#" className="text-[#1E3A8A] underline font-medium">
                                create a new one.
                            </a>
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-[#111827] mb-2">
                                Enter Your Email
                            </label>
                            <input
                                type="email"
                                className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm"
                                placeholder="michael.joe@xmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-[#111827] mb-2">
                                Enter Your Password
                            </label>
                            <input
                                type="password"
                                className="w-full border-none rounded-full p-3 focus:outline-none shadow-sm"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-sm text-[#102467] mt-4 text-center underline cursor-pointer hover:text-[#1E3A8A]">
                            Forgot Your Password
                        </p>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default LoginForm;