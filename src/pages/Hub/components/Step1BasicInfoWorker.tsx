import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { WorkerStep1Schema } from "../../../validation/hubAddWorker";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";

interface Step1Props {
    formData: WorkerPayload;
    setFormData: (data: Partial<WorkerPayload>) => void
    setTempWorkerId: (id: string) => void;
    setStep: (step: number) => void;
}

export interface WorkerPayload {
    name: string;
    email: string;
    // tempWorkerId: string;  
    mobile: string;
    role: "worker";
}

const Step1BasicInfoWorker = ({ formData, setFormData, setTempWorkerId, setStep }: Step1Props) => {
    
    const { tempRegisterWorker } = useHubAddWorker();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: WorkerPayload) => {
        setLoading(true);

        try {
            const result = await tempRegisterWorker(values);

            if (!result.success) return;

            setFormData({ ...formData, ...values });

            
            setTempWorkerId(result.tempWorkerId);
            setStep(2);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={formData}
            validationSchema={WorkerStep1Schema}
            onSubmit={handleSubmit}
        >
            <Form className="max-w-xl mx-auto p-8 border shadow-lg bg-white rounded-lg space-y-6">

                <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-1">
                        Worker Basic Information
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Fill in the basic details to add a new worker.
                    </p>
                </div>

                {/* NAME */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Field name="name" className="px-4 py-2 border rounded-md" placeholder="Enter worker name" />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Field name="email" type="email" className="px-4 py-2 border rounded-md" placeholder="example@domain.com" />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>

                {/* MOBILE */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <Field name="mobile" className="px-4 py-2 border rounded-md" placeholder="10-digit mobile number" />
                    <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm" />
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold"
                >
                    {loading ? "Sending..." : "Send OTP"}
                </button>

            </Form>
        </Formik>
    );
};

export default Step1BasicInfoWorker;
