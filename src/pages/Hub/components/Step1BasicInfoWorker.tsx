import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { WorkerStep1Schema } from "../../../validation/hubAddWorker";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";
import type { WorkerRole } from "../HubAddWorkers";
import WorkerProgressSteps from "./WorkerProgressSteps";

interface Step1Props {
    formData: WorkerPayload;
    setFormData: (data: Partial<WorkerPayload>) => void
    setTempWorkerId: (id: string) => void;
    setStep: (step: number) => void;
}

export interface WorkerPayload {
    name: string;
    email: string;
    mobile: string;
    role: "worker";
    workerRole: WorkerRole;
}

const Step1BasicInfoWorker = ({ formData, setFormData, setTempWorkerId, setStep }: Step1Props) => {

    const { tempRegisterWorker } = useHubAddWorker();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: WorkerPayload) => {
        setLoading(true);

        try {
            const result = await tempRegisterWorker(values);

            if (!result.success) return;

            setFormData(values);

            localStorage.setItem(
                "workerStep1Data",
                JSON.stringify({
                    ...values,
                    tempWorkerId: result.tempWorkerId
                })
            );


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
            <Form className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-16 space-y-6">
                <WorkerProgressSteps currentStep={1} />
                <div className="mb-2">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Add Worker
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Enter the worker details to continue registration.
                    </p>
                </div>
                {/* Header */}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <Field
                            name="name"
                            placeholder="Enter worker name"
                            className="
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                outline-none
                                focus:border-blue-600
                                focus:ring-4
                                focus:ring-blue-100
                                transition-all
                            "
                        />

                        <ErrorMessage
                            name="name"
                            component="p"
                            className="text-red-500 text-xs"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Email Address
                        </label>

                        <Field
                            name="email"
                            type="email"
                            placeholder="example@domain.com"
                            className="
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                outline-none
                                focus:border-blue-600
                                focus:ring-4
                                focus:ring-blue-100
                                transition-all
                            "
                        />

                        <ErrorMessage
                            name="email"
                            component="p"
                            className="text-red-500 text-xs"
                        />
                    </div>

                    {/* MOBILE */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Mobile Number
                        </label>

                        <Field
                            name="mobile"
                            placeholder="10-digit mobile number"
                            className="
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                outline-none
                                focus:border-blue-600
                                focus:ring-4
                                focus:ring-blue-100
                                transition-all
                            "
                        />

                        <ErrorMessage
                            name="mobile"
                            component="p"
                            className="text-red-500 text-xs"
                        />
                    </div>

                    {/* ROLE */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Worker Role
                        </label>

                        <Field
                            as="select"
                            name="workerRole"
                            className="
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                outline-none
                                focus:border-blue-600
                                focus:ring-4
                                focus:ring-blue-100
                                transition-all
                                bg-white
                            "
                        >
                            <option value="TRANSPORT">
                                Transport (Hub ↔ Hub)
                            </option>

                            <option value="PICKUP">
                                Pickup (First Mile)
                            </option>

                            <option value="OUT_FOR_DELIVERY">
                                Delivery (Last Mile)
                            </option>
                        </Field>

                        <ErrorMessage
                            name="workerRole"
                            component="p"
                            className="text-red-500 text-xs"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
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
                            Sending OTP...
                        </div>
                    ) : (
                        "Continue"
                    )}
                </button>
            </Form>
        </Formik>
    );
};

export default Step1BasicInfoWorker;
