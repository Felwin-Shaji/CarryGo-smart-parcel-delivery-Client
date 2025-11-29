import { useState, useEffect, type FormEvent } from "react";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";

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

        console.log(stored, "stored");


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
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
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

        if (otp.length < 4) return;

        setLoading(true);

        const success = await verifyOtp(email, tempWorkerId, otp);
        if (success) {
            setStep(3)
        }
        setLoading(false);

    };

const handelResendOtp = async () => {
    if (!canResend) return;

    const { success, expiresAt } = await resendOtp(email);

    if (success && expiresAt) {
        localStorage.setItem(
            "otpWorkerMeta",
            JSON.stringify({ expiresAt })
        );

        setTimeLeft(120);
        setCanResend(false);
    }
};


    return (
        <div
            className="max-w-md mx-auto p-8 border shadow-lg"
            style={{
                backgroundColor: "white",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-base)",
            }}
        >
            <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--color-primary)" }}
            >
                Verify OTP
            </h2>

            <p className="text-gray-600 text-sm mb-6">
                Enter the OTP sent to <span className="font-semibold">{email}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    maxLength={6}
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 border rounded-lg text-lg tracking-wider text-center focus:ring-2"
                    style={{
                        borderRadius: "var(--radius-md)",
                        borderColor: "#ccc",
                        outline: "none",
                        color: "var(--color-text)",
                        boxShadow: "var(--shadow-base)",
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-white font-semibold"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        borderRadius: "var(--radius-md)",
                        boxShadow: "var(--shadow-base)",
                    }}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    {canResend ? (
                        <button
                            type="button"
                            onClick={handelResendOtp}
                            className="underline"
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <>OTP expires in {formatTime(timeLeft)}</>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Step2OtpVerify;
