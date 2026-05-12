import { useState, useEffect, type FormEvent } from "react";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";
import WorkerProgressSteps from "./WorkerProgressSteps";

interface Step2Props {
    email: string;
    tempWorkerId: string | null;
    setStep: (n: number) => void;
}

interface OtpMeta {
    expiresAt: string;
}

const Step2OtpVerify = ({ email, tempWorkerId, setStep }: Step2Props) => {

    const { verifyOtp, resendOtp } = useHubAddWorker()

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [canResend, setCanResend] = useState(false);


    useEffect(() => {
        const stored = localStorage.getItem("otpWorkerMeta");
        let otpMeta: OtpMeta | null = null;



        if (stored) {
            try {
                otpMeta = JSON.parse(stored);
            } catch {
                localStorage.removeItem("otpWorkerMeta");
            }
        }

        if (otpMeta) {
            const expiry = new Date(otpMeta.expiresAt).getTime();
            const now = Date.now();
            const remaining = Math.floor((expiry - now) / 1000);

            if (remaining > 0) {
                setTimeLeft(remaining);
                setCanResend(false);
            } else {
                setTimeLeft(0);
                setCanResend(true);
                localStorage.removeItem("otpWorkerMeta");
            }
        } else {
            setCanResend(true);
        }
    }, []);

    useEffect(() => {
        if (!timeLeft) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    localStorage.removeItem("otpWorkerMeta");
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (otp.length !== 4) return;

        if (!tempWorkerId) {
            console.error("Temp worker id missing");
            return;
        }

        setLoading(true);

        try {
            const success = await verifyOtp(email, tempWorkerId, otp);

            if (success) {
                setStep(3);
            }
        } finally {
            setLoading(false);
        }
    };

    const handelResendOtp = async () => {
        if (!canResend) return;

        try {
            const { expiresAt } = await resendOtp(email);

            if (expiresAt) {
                localStorage.setItem(
                    "otpWorkerMeta",
                    JSON.stringify({ expiresAt })
                );

                setTimeLeft(120);
                setCanResend(false);
                setOtp("");
            }
        } catch (error) {
            console.error("Failed to resend OTP", error);
        }
    };


    return (
        <div className="w-full flex justify-center px-4 py-12">
            <div className="w-full max-w-5xl  bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                {/* Step */}
                <WorkerProgressSteps currentStep={2} />

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Verify OTP
                    </h2>

                    <p className="text-sm text-gray-500 mt-3">
                        Enter the 4-digit code sent to
                    </p>

                    <p className="text-sm font-semibold text-blue-700 mt-1 break-all">
                        {email}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5 mt-8 ">

                    {/* OTP */}
                    <input
                        type="text"
                        maxLength={4}
                        inputMode="numeric"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="0000"
                        className="
                        w-50%
                        h-14
                        rounded-xl
                        border
                        border-gray-300
                        text-center
                        text-2xl
                        tracking-[0.8rem]
                        font-semibold
                        outline-none
                        focus:border-blue-600
                        focus:ring-4
                        focus:ring-blue-100
                        transition-all
                    "
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading || otp.length !== 4}
                        className="
                        w-full
                        h-12
                        rounded-xl
                        bg-blue-700
                        hover:bg-blue-800
                        text-white
                        font-semibold
                        transition-all
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        flex
                        items-center
                        justify-center
                    "
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying...
                            </div>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>

                    {/* Timer */}
                    <div className="text-center pt-1">
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handelResendOtp}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-blue-50
                                    text-blue-700
                                    text-sm
                                    font-medium
                                    hover:bg-blue-100
                                    transition-all
                                "
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <p className="text-sm text-gray-500">
                                OTP expires in{" "}
                                <span className="font-semibold text-slate-700">
                                    {formatTime(timeLeft)}
                                </span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Step2OtpVerify;
