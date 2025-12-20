import BaseModal, { ModalInput } from "../../../../components/globelcomponents/BaseModal";
import { useFormik } from "formik";
import { userResetPasswordSchema } from "../../../../validation/userResetPassword";

interface ResetPasswordModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => void;
}

const UserResetPasswordModal = ({
    open,
    onClose,
    onSave,
}: ResetPasswordModalProps) => {

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: userResetPasswordSchema,
        onSubmit: async (values) => {
            await onSave(values);
            formik.resetForm();
        },
    });


    return (
        <BaseModal title="Reset Password" open={open} onClose={onClose}>
            <div className="space-y-5">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <ModalInput
                        label="Current Password"
                        type="password"
                        value={formik.values.currentPassword}
                        onChange={(v) =>
                            formik.setFieldValue("currentPassword", v)
                        }
                        onBlur={() =>
                            formik.setFieldTouched("currentPassword", true)
                        }
                    />
                    {formik.touched.currentPassword &&
                        formik.errors.currentPassword && (
                            <p className="text-xs text-red-500">
                                {formik.errors.currentPassword}
                            </p>
                        )}

                    <ModalInput
                        label="New Password"
                        type="password"
                        value={formik.values.newPassword}
                        onChange={(v) =>
                            formik.setFieldValue("newPassword", v)
                        }
                        onBlur={() =>
                            formik.setFieldTouched("newPassword", true)
                        }
                    />
                    {formik.touched.newPassword &&
                        formik.errors.newPassword && (
                            <p className="text-xs text-red-500">
                                {formik.errors.newPassword}
                            </p>
                        )}

                    <ModalInput
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={(v) =>
                            formik.setFieldValue("confirmPassword", v)
                        }
                        onBlur={() =>
                            formik.setFieldTouched("confirmPassword", true)
                        }
                    />
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <p className="text-xs text-red-500">
                                {formik.errors.confirmPassword}
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
                            className="px-4 py-1.5 text-xs disabled:opacity-50"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

export default UserResetPasswordModal;