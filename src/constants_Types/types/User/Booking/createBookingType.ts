import type { AddressUI } from "../../../../context/Booking/Booking.types";

type BasePackageDetails = {
    category: string;
    weightKg: number;

    dimensions: {
        lengthCm: number;
        widthCm: number;
        heightCm: number;
    };
};

export interface CalculatePricePayload {
    deliveryType: "AGENCY" | "TRAVELER";

    partnerId?: string;
    travelRequestId?: string;

    pickupAddress: AddressUI;
    deliveryAddress: AddressUI;

    packageDetails: BasePackageDetails
}


export type AgencyBookingPayload = {
    deliveryType: "AGENCY";
    partnerId: string;
    fromHubId:string;
    toHubId:string;

    pickupAddress: AddressUI
    deliveryAddress: AddressUI

    packageDetails: BasePackageDetails
};

type TravelerBookingPayload = {
    deliveryType: "TRAVELER";
    partnerId: string;
    travelRequestId: string;

    pickupAddress: AddressUI
    deliveryAddress: AddressUI

    packageDetails: BasePackageDetails
};

export type CreateBookingPayload =
    | AgencyBookingPayload
    | TravelerBookingPayload;
