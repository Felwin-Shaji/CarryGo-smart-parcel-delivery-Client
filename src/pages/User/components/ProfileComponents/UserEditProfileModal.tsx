import { useState } from "react";
import BaseModal, { ModalInput } from "../../../../components/globelcomponents/BaseModal";

interface UserEditProfileModalProps {
    open: boolean;
    onClose: () => void;
    user: { name: string; mobile: string };
    onSave: (data: { name: string; mobile: string }) => void;
};

const UserEditProfileModal = ({ open, onClose, user, onSave, }: UserEditProfileModalProps) => {
    const [name, setName] = useState(user.name);
    const [mobile, setMobile] = useState(user.mobile);

    return (
        <BaseModal title="Edit Profile" open={open} onClose={onClose}>
            <div className="space-y-5">
                <ModalInput
                    label="Full Name"
                    value={name}
                    onChange={setName}
                />

                <ModalInput
                    label="Mobile Number"
                    value={mobile}
                    onChange={setMobile}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button onClick={onClose} className="px-4 py-1.5 text-xs">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave({ name, mobile })}
                        className="px-4 py-1.5 text-xs"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default UserEditProfileModal
