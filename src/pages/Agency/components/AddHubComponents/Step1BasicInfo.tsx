import { Formik, Form, Field, ErrorMessage } from "formik";
import type { AddHubPayload } from "../../AgencyAddHubs";
import { Step1Schema } from "../../../../validation/agencyAddHubb";
import { useAgencyAddHub } from "../../../../Services/Agency/AgencyAddHub";
import type { Roles } from "../../../../constants_Types/types/roles";
import { useState } from "react";

interface Step1Props {
    formData: AddHubPayload;
    setStep: (n: number) => void;
    setTempHubId: (id: string) => void;
    setFormData: (formData: AddHubPayload) => void;
}

export interface HubOtpMeta {
    email: string;
    expiresAt: string;
    role: Roles;
    tempHubId: string;
}

const Step1BasicInfo = ({ formData, setFormData, setTempHubId, setStep }: Step1Props) => {
    const { tempRegister } = useAgencyAddHub()
    const [ loading, setLoading ] = useState(false)

    const handleSubmit = async (values: AddHubPayload) => {
        setLoading(true)

        try {
            const result = await tempRegister(values);

            if (!result.success) return;

            setFormData({ ...formData, ...values });
            setTempHubId(result.tempHubId);
            setStep(2);

        } finally {
            setLoading(false);
        }
    };


    return (
        <Formik
            initialValues={formData}
            validationSchema={Step1Schema}
            onSubmit={handleSubmit}
        >
            <Form
                className="max-w-xl mx-auto p-8 border shadow-lg space-y-6"
                style={{
                    backgroundColor: "white",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-base)",
                }}
            >
                {/* HEADER */}
                <div>
                    <h2
                        className="text-2xl font-bold mb-1"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Hub Basic Information
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Provide basic details to register a new hub.
                    </p>
                </div>

                {/* NAME */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Hub Name</label>
                    <Field
                        name="name"
                        placeholder="Enter hub name"
                        className="px-4 py-2 border rounded-lg"
                        style={{ borderRadius: "var(--radius-md)" }}
                    />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Hub Email</label>
                    <Field
                        name="email"
                        placeholder="example@domain.com"
                        className="px-4 py-2 border rounded-lg"
                        style={{ borderRadius: "var(--radius-md)" }}
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>

                {/* MOBILE */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contact Number</label>
                    <Field
                        name="mobile"
                        placeholder="10-digit mobile number"
                        className="px-4 py-2 border rounded-lg"
                        style={{ borderRadius: "var(--radius-md)" }}
                    />
                    <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm" />
                </div>

                {/* SEND OTP BUTTON */}
                <button
                    type="submit"
                    className="w-full py-3 text-white font-semibold"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        borderRadius: "var(--radius-md)",
                        boxShadow: "var(--shadow-base)",
                    }}
                >
                    {loading?`loading...`:`Send OTP`}
                </button>
            </Form>
        </Formik>
    );
};

export default Step1BasicInfo;
