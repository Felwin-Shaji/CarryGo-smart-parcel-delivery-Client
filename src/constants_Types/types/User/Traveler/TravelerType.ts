export type PackageSizeType = "SMALL" | "MEDIUM" | "LARGE";
export type TransportMode = "FLIGHT" | "TRAIN" | "CAR" | "BUS" | "BIKE";

export type CreateTravelRequestDTO = {
  startAddressId: string;
  endAddressId: string;
  departureAt: string;   
  arrivalAt: string;     
  capacityKg: number;
  remainingCapacityKg: number;
  allowedPackageSizes: PackageSizeType[];
  modeOfTransport: TransportMode;
  description: string;
  status: "DRAFT";
};