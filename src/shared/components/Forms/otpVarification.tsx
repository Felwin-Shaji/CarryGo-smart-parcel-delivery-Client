import { useState, useRef, type FormEvent, type ChangeEvent, useEffect } from "react";
import type { OtpMeta } from "../../../pages/User/OtpVarificationpage";
import LoadingScreen from "../loading/CarryGoLoadingScreen";
import logo from "../../../assets/carrygo-logo.png";
import { loginTheme } from "../../../context/loginTheme";
import type { Roles } from "../../constants_Types/types/roles";


interface OtpVerificationFormProps {
    role: Roles;
    title?: string;
    onSubmit: (otp: string) => void;
    loading?: boolean;
    email?: string | null;
    onResendOtp?: () => void;
}

const OtpVerificationForm = ({
    role,
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

    const theme = loginTheme[role as Roles];

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
    console.log("loading :", loading);
    if (loading) return <LoadingScreen />

    return (
        <div
            className={`min-h-screen bg-gradient-to-br ${theme.pageBg} flex items-center justify-center px-4 py-8 overflow-y-auto`}
        >
            {/* Main Card */}
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
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-sm font-medium mb-8 text-white">
                            OTP Verification
                        </div>

                        <img
                            src={logo}
                            alt="CarryGo Logo"
                            className="w-[240px] object-contain drop-shadow-2xl"
                        />

                        <p className="mt-6 text-white/80 text-base leading-relaxed max-w-sm">
                            Securely verify your account and continue accessing CarryGo services.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                    className={`${theme.cardBg} backdrop-blur-xl p-8 md:p-14 flex items-center`}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md mx-auto"
                    >
                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className={`text-4xl font-bold ${theme.heading}`}>
                                {title}
                            </h2>

                            {email && (
                                <p className={`mt-3 text-base ${theme.subtext}`}>
                                    We’ve sent a 4-digit OTP to{" "}
                                    <span className="font-semibold">
                                        {email}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* OTP INPUTS */}
                        <div className="flex justify-between gap-4 mb-8">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    inputMode="numeric"
                                    ref={(el) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`
                                    w-16 h-16 rounded-2xl text-center text-2xl font-bold
                                    outline-none transition-all duration-300
                                    ${theme.input}
                                    focus:scale-105
                                `}
                                />
                            ))}
                        </div>

                        {/* VERIFY BUTTON */}
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
                            Verify OTP
                        </button>

                        {/* TIMER / RESEND */}
                        <div className="mt-6 text-center">
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={onResendOtp}
                                    className={`text-sm font-semibold hover:underline ${theme.accent}`}
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <p className={`text-sm ${theme.subtext}`}>
                                    OTP expires in{" "}
                                    <span className="font-semibold">
                                        {formatTime(timeLeft)}
                                    </span>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationForm;
