type AgencyPricePayload = {
    deliveryType: "AGENCY";
    partnerId: string;
    packageDetails: {
        category: string;
        size: "SMALL" | "MEDIUM" | "LARGE";
        weightKg: number;
    };
    pickupAddressId: string;
    deliveryAddressId: string;
};

type TravelerPricePayload = {
    deliveryType: "TRAVELER";
    partnerId: string;
    travelRequestId: string;
    packageDetails: {
        category: string;
        size: "SMALL" | "MEDIUM" | "LARGE";
        weightKg: number;
    };
    pickupAddressId: string;
    deliveryAddressId: string;
};

export type CalculatePricePayload =
    | AgencyPricePayload
    | TravelerPricePayload;


    type AgencyBookingPayload = {
    deliveryType: "AGENCY";
    partnerId: string;

    pickupAddressId: string;
    deliveryAddressId: string;

    packageDetails: {
        category: string;
        size: "SMALL" | "MEDIUM" | "LARGE";
        weightKg: number;
    };
};

type TravelerBookingPayload = {
    deliveryType: "TRAVELER";
    partnerId: string; // travelerId
    travelRequestId: string; // REQUIRED

    pickupAddressId: string;
    deliveryAddressId: string;

    packageDetails: {
        category: string;
        size: "SMALL" | "MEDIUM" | "LARGE";
        weightKg: number;
    };
};

export type CreateBookingPayload =
    | AgencyBookingPayload
    | TravelerBookingPayload;
