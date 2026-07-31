import { Toaster } from "react-hot-toast";

const AppToaster = () => {
    return (
        <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{
                zIndex: 999999,
                top: 20,
                right: 20,
            }}
            toastOptions={{
                duration: 3500,

                style: {
                    background: "rgba(17,24,39,.88)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    color: "#F9FAFB",

                    border: "1px solid rgba(255,255,255,.08)",

                    borderRadius: "12px",

                    padding: "14px 16px",

                    minWidth: "340px",

                    boxShadow:
                        "0 16px 48px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05)",

                    fontSize: "14px",
                    fontWeight: 500,
                },

                success: {
                    iconTheme: {
                        primary: "#22C55E",
                        secondary: "#111827",
                    },
                },

                error: {
                    iconTheme: {
                        primary: "#EF4444",
                        secondary: "#111827",
                    },
                },

                loading: {
                    iconTheme: {
                        primary: "#3B82F6",
                        secondary: "#111827",
                    },
                },
            }}
        />
    );
};

export default AppToaster;