import { useEffect, useState } from "react"
import { ROLES, type Roles } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"
import Step1BasicInfo from "./components/AddHubComponents/Step1BasicInfo"
import Step2OtpVerify from "./components/AddHubComponents/Step2OtpVerify"
import Step3Address from "./components/AddHubComponents/Step3Address"
import Step4Verification from "./components/AddHubComponents/Step4Verification"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { useAgencyAddHub } from "../../Services/Agency/AgencyAddHub"

export interface AddHubPayload {
    agencyId: string
    name: string;
    email: string;
    mobile: string;
    role: Roles;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    location_lat: number;
    location_lng: number;
    verificationImage: File | null;
}


const AgencyAddHubs = () => {
    const id = useSelector((state: RootState) => state.agencyState.agency?.id)
    const { checkTempStatus } = useAgencyAddHub();

    const [step, setStep] = useState(1);
    const [showMap, setShowMap] = useState(false);
    const [tempHubId, setTempHubId] = useState<string | null>(null);

    const [formData, setFormData] = useState<AddHubPayload>({
        agencyId: id!,
        name: "",
        email: "",
        mobile: "",
        role: "hub",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",
        location_lat: 0,
        location_lng: 0,
        verificationImage: null as File | null,
    });

    useEffect(() => {
    const saved = localStorage.getItem("otpHubMeta");
    if (!saved) return;

    const meta = JSON.parse(saved);

    setFormData(prev => ({ ...prev, email: meta.email }));
    setTempHubId(meta.tempHubId);

}, []);


    useEffect(() => {
        if (!formData.email) return;

        const fetchStatus = async () => {
            const data = await checkTempStatus(formData.email);

            if (!data.exists) return;

            setTempHubId(data.tempHubId);

            if (data.status === "OTP-Verified") {
                setStep(3); 
            } else {
                setStep(2); 
            }
        };

        fetchStatus();
    }, [formData.email]);
    return (
        <>
            <DashboardProvider role={ROLES.AGENCY}>
                <DashboardLayout>

                    {/* <div className="max-w-3xl mx-auto p-5"> */}
                    {step === 1 && (
                        <Step1BasicInfo
                            formData={formData}
                            setFormData={setFormData}
                            setTempHubId={setTempHubId}
                            setStep={setStep}
                        />
                    )}

                    {step === 2 && (
                        <Step2OtpVerify
                            email={formData.email}
                            tempHubId={tempHubId}
                            setStep={setStep}
                        />
                    )}

                    {step === 3 && (
                        <Step3Address
                            formData={formData}
                            setFormData={setFormData}
                            setStep={setStep}
                            showMap={showMap}
                            setShowMap={setShowMap}
                        />
                    )}

                    {step === 4 && (
                        <Step4Verification
                            formData={formData}
                            tempHubId={tempHubId}
                        />
                    )}
                    {/* </div> */}
                </DashboardLayout>
            </DashboardProvider>
        </>
    )
}

export default AgencyAddHubs