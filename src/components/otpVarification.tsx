import { useState, useRef, type FormEvent, type ChangeEvent, useEffect } from "react";
import type { OtpMeta } from "../pages/User/RegistrationPage";

interface OtpVerificationFormProps {
    title?: string;
    onSubmit: (otp: string) => void;
    loading?: boolean;
    email?: string | null;
    onResendOtp?: () => void;
}

const OtpVerificationForm = ({
    title = "Verify Your Account",
    onSubmit,
    loading,
    email,
    onResendOtp,
}: OtpVerificationFormProps) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [canResend, setCanResend] = useState(false);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/, "");
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (index < 3 && value) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputsRef.current[index - 1]?.focus();
        }
    };

    // ✅ Load OTP meta and calculate remaining time
    useEffect(() => {
        const stored = localStorage.getItem("otpMeta");
        let otpMeta: OtpMeta | null = null;

        if (stored) {
            try {
                otpMeta = JSON.parse(stored) as OtpMeta;
            } catch (error) {
                console.error("Invalid OTP meta in storage:", error);
                localStorage.removeItem("otpMeta");
            }
        }

        if (otpMeta) {
            const expiryTime = new Date(otpMeta.expiresAt).getTime();
            const now = Date.now();
            const remainingTime = Math.floor((expiryTime - now) / 1000);

            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
                setCanResend(false);
            } else {
                localStorage.removeItem("otpMeta");
                setTimeLeft(0);
                setCanResend(true);
            }
        } else {
            setCanResend(true);
        }
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length === 4) {
            onSubmit(otpValue);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Inter] p-4 md:p-8">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl max-w-5xl w-full mx-auto md:rounded-tr-[60px]">
                {/* Left Section */}
                <div className="bg-gray-100 flex justify-center items-center w-full md:w-1/2 p-6 md:p-10">
                    <img
                        src="/src/assets/carrygo-logo.png"
                        alt="CarryGo Logo"
                        className="max-w-[250px] md:max-w-[300px] w-full object-contain"
                    />
                </div>

                {/* Right Section */}
                <div className="bg-[#FACC15] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center rounded-t-2xl md:rounded-t-none md:rounded-l-[60px] md:rounded-tr-[60px]">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2 text-center md:text-left">
                            {title}
                        </h2>

                        {email && (
                            <p className="text-sm text-[#102467] mb-4 text-center md:text-left">
                                We’ve sent a 4-digit OTP to <span className="font-semibold">{email}</span>
                            </p>
                        )}

                        {/* OTP Inputs */}
                        <div className="flex justify-between gap-3 mb-6 mt-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    inputMode="numeric"
                                    ref={(el) => { (inputsRef.current[index] = el) }}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-14 h-14 text-center text-xl font-semibold rounded-xl border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E3A8A] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#102467] transition disabled:opacity-60"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        {/* Timer + Resend */}
                        <p className="text-sm text-[#102467] mt-4 text-center">
                            {canResend ? (
                                <span
                                    className="underline cursor-pointer hover:text-[#1E3A8A]"
                                    onClick={onResendOtp}
                                >
                                    Resend OTP
                                </span>
                            ) : (
                                <>Otp expires in {formatTime(timeLeft)}s</>
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationForm;
