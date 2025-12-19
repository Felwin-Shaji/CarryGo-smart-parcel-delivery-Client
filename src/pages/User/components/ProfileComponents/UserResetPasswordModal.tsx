import { useState } from "react";
import BaseModal, { ModalInput } from "../../../../components/globelcomponents/BaseModal";

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
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <BaseModal title="Reset Password" open={open} onClose={onClose}>
            <div className="space-y-5">
                <ModalInput
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                />

                <ModalInput
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                />

                <ModalInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button onClick={onClose} className="px-4 py-1.5 text-xs">
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            onSave({ currentPassword, newPassword, confirmPassword })
                        }
                        className="px-4 py-1.5 text-xs"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default UserResetPasswordModal