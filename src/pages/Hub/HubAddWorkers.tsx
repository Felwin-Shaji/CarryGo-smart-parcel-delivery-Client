import { useEffect, useState } from "react";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useHubAddWorker } from "../../Services/Hub/HubAddWorkers";
import Step2OtpVerify from "./components/Step2OtpVerify";
import Step3UploadKYCWorker from "./components/Step3UploadKYCWorker";
import Step1BasicInfoWorker from "./components/Step1BasicInfoWorker";

export interface AddWorkerPayload {
    hubId: string
    name: string;
    email: string;
    mobile: string;
    role: "worker";
    tempWorkerId: string;  
}

const HubAddWorker = () => {
    const hubId = useSelector((state: RootState) => state.hubState.hub?.id);
    const { checkTempWorkerStatus } = useHubAddWorker();

    const [step, setStep] = useState(1);
    const [tempWorkerId, setTempWorkerId] = useState<string | null>(null);

    const [formData, setFormData] = useState<AddWorkerPayload>({
        hubId: hubId!,
        name: "",
        email: "",
        mobile: "",
        role: "worker",
        tempWorkerId: ""  
    });

    useEffect(() => {
        const saved = localStorage.getItem("otpWorkerMeta");
        if (!saved) return;

        const meta = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, email: meta.email }));
        setTempWorkerId(meta.tempWorkerId);
    }, []);

    useEffect(() => {
        if (!formData.email) return;

        const fetchStatus = async () => {
            const data = await checkTempWorkerStatus(formData.email);

            if (!data.exists) return;

            setTempWorkerId(data.tempWorkerId);

            if (data.status === "OTP-Verified") {
                setStep(3);
            } else {
                setStep(2);
            }
        };

        fetchStatus();
    }, [formData.email]);

    return (
        <DashboardProvider role="hub">
            <DashboardLayout pageTitle="Add Worker">

                {step === 1 && (
                    <Step1BasicInfoWorker
                        formData={formData}
                        setFormData={(data) =>
                            setFormData((prev: AddWorkerPayload) => ({
                                ...prev,
                                ...data,   
                            }))
                        }
                        setTempWorkerId={setTempWorkerId}
                        setStep={setStep}
                    />

                )}


                {step === 2 && (
                    <Step2OtpVerify
                        email={formData.email}
                        tempWorkerId={tempWorkerId}
                        setStep={setStep}
                    />
                )}

                {step === 3 && (
                    <Step3UploadKYCWorker
                        formData={formData}
                        tempWorkerId={tempWorkerId}
                        setStep={setStep}
                    />
                )}

            </DashboardLayout>
        </DashboardProvider>
    );
};

export default HubAddWorker;
