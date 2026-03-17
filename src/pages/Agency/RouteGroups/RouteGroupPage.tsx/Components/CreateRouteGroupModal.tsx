import { X } from "lucide-react";
import { useFormik } from "formik";
import { addRouteGroupValidationSchema } from "../../../../../validation/Agency/agencyAddRoute";
import { useAgencyRouteGroup } from "../../../../../Services/Agency/AgencyRouteGroup";

interface Props {
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateRouteGroupModal({ onClose, onCreated }: Props) {

    const { createRouteGroup } = useAgencyRouteGroup()

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            isActive: true,
        },

        validationSchema: addRouteGroupValidationSchema,

        onSubmit: async (values) => {
            console.log(values);
            const res = await createRouteGroup(values)
            console.log(res)
            onCreated()
        },
    });

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-[460px] shadow-xl border border-gray-100">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            New Route Group
                        </h2>
                        <p className="text-sm text-gray-500">
                            Organize route segments into a logistics corridor
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit}>

                    <div className="px-6 py-5 space-y-4">

                        {/* Route Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Route Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                placeholder="East Coast Express"
                                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.name && formik.errors.name && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Describe this logistics corridor..."
                                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.description && formik.errors.description && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        {/* Active Toggle */}
                        <div className="flex items-center justify-between border rounded-xl px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Active Status
                                </p>
                                <p className="text-xs text-gray-500">
                                    Enable to make this route group operational
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue("isActive", !formik.values.isActive)
                                }
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${formik.values.isActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${formik.values.isActive ? "translate-x-5" : ""
                                        }`}
                                />
                            </button>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90"
                        >
                            Create Route Group
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}