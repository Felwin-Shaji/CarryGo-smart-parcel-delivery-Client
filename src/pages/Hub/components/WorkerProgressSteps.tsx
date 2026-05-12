interface Props {
    currentStep: number;
}

const steps = [
    "Basic Info",
    "Verify OTP",
    "Upload KYC"
];

const WorkerProgressSteps = ({ currentStep }: Props) => {
    return (
        <div className="flex items-center justify-center mb-8">

            {steps.map((step, index) => {
                const stepNumber = index + 1;

                const completed = stepNumber < currentStep;
                const active = stepNumber === currentStep;

                return (
                    <div
                        key={step}
                        className="flex items-center"
                    >
                        {/* Circle */}
                        <div className="flex flex-col items-center">

                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    text-sm font-semibold transition-all duration-200
                                    ${completed
                                        ? "bg-green-500 text-white"
                                        : active
                                            ? "bg-blue-700 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }
                                `}
                            >
                                {completed ? "✓" : stepNumber}
                            </div>

                            <span
                                className={`
                                    mt-2 text-xs font-medium whitespace-nowrap
                                    ${active
                                        ? "text-blue-700"
                                        : "text-gray-500"
                                    }
                                `}
                            >
                                {step}
                            </span>
                        </div>

                        {/* Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`
                                    w-16 h-[2px] mx-3 mb-6
                                    ${stepNumber < currentStep
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }
                                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default WorkerProgressSteps;