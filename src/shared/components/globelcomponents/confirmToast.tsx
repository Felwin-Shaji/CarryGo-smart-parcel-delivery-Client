import toast from "react-hot-toast";

export const confirmToast = (text: string, onConfirm: () => void) => {
    toast(
        (t) => (
            <div className="text-sm bg-white rounded-lg shadow-lg p-4 border border-gray-200">

                <p className="font-semibold text-gray-800 mb-3">{text}</p>

                <div className="flex gap-3 justify-end">

                    {/* Cancel (not using <button> to avoid collision) */}
                    <div
                        role="button"
                        onClick={() => toast.dismiss(t.id)}
                        className="
              px-3 py-1.5 border rounded-md 
              text-gray-700 bg-gray-100 
              hover:bg-gray-200 cursor-pointer 
              transition
            "
                    >
                        Cancel
                    </div>

                    {/* Confirm */}
                    <div
                        role="button"
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm();
                        }}
                        className="
              px-3 py-1.5 rounded-md text-white 
              cursor-pointer transition
              bg-[var(--color-primary)] 
              hover:bg-[var(--color-primary-dark)]
              shadow-sm
            "
                    >
                        Confirm
                    </div>

                </div>
            </div>
        ),
        {
            duration: 6000,
            position: "top-center",
            style: {
                background: "transparent",
                boxShadow: "none",
                padding: 0,
            },
        }
    );
};
