export interface getServiceableHubWithAgencyResponseDTO {
    agency: {
        agencyId: string;
        name: string;
        commissionRate: number;
    };

    fromHub: {
        hubId: string;
        hubName: string;
        address: {
            city: string;
            state: string;
            pincode: string;
        };
        location: {
            lat: number;
            lng: number;
        };
    };

    toHub: {
        hubId: string;
        hubName: string;
        address: {
            city: string;
            state: string;
            pincode: string;
        };
        location: {
            lat: number;
            lng: number;
        };
    };
}



export interface AddressDTO {
  id: string;
  label: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};


export interface PricingResponseDTO {
  distanceKm: number;

  basePrice: number;
  distanceCharge: number;
  sizeCharge: number;

  platformFee: number;
  totalPrice: number;

  currency: "INR";
}

