export type Coordinates = [number, number];

export interface ReverseGeocodeResponse {
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  formattedAddress: string;
}

export interface AddressFormState {
  label: "Home" | "Office" | "Warehouse" | "Other";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress: string;
}

export interface SaveAddressPayload extends AddressFormState {
  location: {
    lat: number;
    lng: number;
  };
}
