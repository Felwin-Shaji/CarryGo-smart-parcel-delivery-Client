import { useEffect, useState } from "react";
import { MdHome, MdBusiness, MdWarehouse } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddress } from "../../Services/User/useAddress";
import { confirmToast } from "../../components/globelcomponents/confirmToast";
import { Header } from "./components/Header";


export default function AddressListPage() {
    const navigate = useNavigate();
    const { getAddresses, deleteAddress, setDefaultAddress } = useAddress();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const data = await getAddresses();
            setAddresses(data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        confirmToast("Delete this address?", async () => {
            await deleteAddress(id);
            toast.success("Address deleted");
            fetchAddresses();
        });
    };

    const handleSetDefault = (id: string) => {
        confirmToast("Set this as default address?", async () => {
            await setDefaultAddress(id);
            toast.success("Default address updated");
            fetchAddresses();
        });
    };

    const getIcon = (label: Address["label"]) => {
        if (label === "Home") return <MdHome />;
        if (label === "Office") return <MdBusiness />;
        return <MdWarehouse />;
    };

    return (
        <>
            <Header isLoggedIn={true} />

            <div className="max-w-3xl mx-auto mt-20 pt-20  px-4">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>

                    <button
                        onClick={() => navigate("/add-address")}
                        className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium"
                    >
                        + Add Address
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-gray-500">Loading addresses…</div>
                )}

                {/* Empty State */}
                {!loading && addresses.length === 0 && (
                    <div className="rounded-xl bg-white p-6 text-center shadow-sm border border-gray-200">
                        <p className="mb-4 text-gray-600">
                            You haven’t added any addresses yet.
                        </p>

                        <div
                            role="button"
                            onClick={() => navigate("/add-address")}
                            className="inline-block cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition" >
                            Add your first address
                        </div>
                    </div>
                )}

                {/* Address List */}
                <div className="grid gap-4">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className={`group rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition border ${address.isDefault ? "border-black" : "border-gray-100"} `}>
                            {/* Top Row */}
                            <div className="flex items-start justify-between gap-4">
                                {/* Left */}
                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg
                                             ${address.isDefault
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-700"}
                                        `}>
                                        {getIcon(address.label)}
                                    </div>

                                    {/* Address Info */}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                {address.label}
                                            </h3>

                                            {address.isDefault && (
                                                <span className="rounded-full bg-black/90 px-2 py-0.5 text-[10px] text-white">
                                                    DEFAULT
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm font-medium text-gray-800">
                                            {address.formattedAddress}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {address.city}, {address.state} • {address.pincode}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions (NO <button>) */}
                                <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                                    {/* <div
                                        role="button"
                                        onClick={() => navigate(`/edit-address/${address._id}`)}
                                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-black cursor-pointer"
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </div> */}

                                    <div
                                        role="button"
                                        onClick={() => handleDelete(address._id)}
                                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Action */}
                            {!address.isDefault && (
                                <div
                                    role="button"
                                    onClick={() => handleSetDefault(address._id)}
                                    className="mt-4 inline-block text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                                >
                                    Set as default
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};




export type AddressLabel = "Home" | "Office" | "Warehouse" | "Other";

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    _id: string;
    label: AddressLabel;

    city: string;
    state: string;
    country: string;
    pincode: string;

    formattedAddress: string | null;

    location: Coordinates;

    isDefault: boolean;
    isActive: boolean;

    createdAt?: string;
    updatedAt?: string;
}

