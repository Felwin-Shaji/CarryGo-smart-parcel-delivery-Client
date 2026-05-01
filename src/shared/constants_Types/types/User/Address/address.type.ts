export type Coordinates = [number, number];

export interface ReverseGeocodeResponse {

  addressLine1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress: string;
  lat: number;
  lng: number;
}

export interface AddressFormState {
  label: "Home" | "Office" | "Warehouse" | "Other";
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface SaveAddressPayload extends AddressFormState {
  location: {
    lat: number;
    lng: number;
  };
}
