import toast from "react-hot-toast";
import type { Coordinates, ReverseGeocodeResponse, SaveAddressPayload } from "../../shared/constants_Types/types/User/Address/address.type";
import { useAxios } from "../../hooks/useAxios";
import { API_USER } from "../../shared/constants_Types/apiRoutes";
import type { Address } from "../../pages/User/AddressListPage";

export const useAddress = () => {
    const axiosInstance = useAxios();

    const reverseGeocode = async (coords: Coordinates) => {
        const res = await axiosInstance.get(
            `${API_USER.REVERSE_GEOCODE}?lat=${coords[0]}&lon=${coords[1]}`
        );
        return res.data.data as ReverseGeocodeResponse;
    };

    const saveAddress = async (payload: SaveAddressPayload) => {
        await axiosInstance.post(API_USER.ADD_ADDRESS, payload);
        toast.success("Address saved successfully");
        return
    };

    const getAddresses = async (): Promise<Address[]> => {
        const res = await axiosInstance.get(API_USER.GET_ADDRESSES);
        console.log(res.data.data);
        return res.data.data;  
    };

    const deleteAddress = async (id: string): Promise<void> => {
        await axiosInstance.delete(`${API_USER.DELETE_ADDRESS}/${id}`);
    };

    const setDefaultAddress = async (id: string): Promise<void> => {
        await axiosInstance.patch(`${API_USER.SET_DEFAULT_ADDRESS}/${id}`);
    };


    return {
        reverseGeocode,
        saveAddress,
        getAddresses,
        deleteAddress,
        setDefaultAddress
    };
};
