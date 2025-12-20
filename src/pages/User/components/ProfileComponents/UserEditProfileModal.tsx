import { useFormik } from "formik";
import BaseModal, { ModalInput } from "../../../../components/globelcomponents/BaseModal";
import { userEditProfileSchema } from "../../../../validation/editProfileValidation";

interface UserEditProfileModalProps {
    open: boolean;
    onClose: () => void;
    user: { name: string; mobile: string };
    onSave: (data: { name: string; mobile: string }) => void;
};

const UserEditProfileModal = ({ open, onClose, user, onSave, }: UserEditProfileModalProps) => {

    const formik = useFormik({
        initialValues: {
            name: user.name,
            mobile: user.mobile,
        },
        enableReinitialize: true,
        validationSchema: userEditProfileSchema,
        onSubmit: async (values) => {
            await onSave(values);
        },
    });

    const isUnchanged =
        formik.values.name === user.name &&
        formik.values.mobile === user.mobile



    return (
        <BaseModal title="Edit Profile" open={open} onClose={onClose}>
            <div className="space-y-5">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {isUnchanged && (
                        <p className="text-xs text-gray-400">
                            Make a change to enable saving
                        </p>
                    )}

                    <ModalInput
                        label="Full Name"
                        value={formik.values.name}
                        onChange={(v) => formik.setFieldValue("name", v)}
                        onBlur={() => formik.setFieldTouched("name", true)}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {formik.errors.name}
                        </p>
                    )}

                    <ModalInput
                        label="Mobile Number"
                        value={formik.values.mobile}
                        onChange={(v) => formik.setFieldValue("mobile", v)}
                        onBlur={() => formik.setFieldTouched("mobile", true)}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                        <p className="text-xs text-red-500 mt-1">
                            {formik.errors.mobile}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 text-xs"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-1.5 text-xs"
                            disabled={!formik.isValid || isUnchanged}
                        >
                            Save Changes
                        </button>

                    </div>
                </form>
            </div>
        </BaseModal >
    );
};

export default UserEditProfileModal
