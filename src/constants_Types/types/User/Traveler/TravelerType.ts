import type { AddressUI } from "../../../../context/Booking/Booking.types";

// export type PackageSizeType = "SMALL" | "MEDIUM" | "LARGE";
export type TransportMode = "FLIGHT" | "TRAIN" | "CAR" | "BUS" | "BIKE";

export type CreateTravelRequestDTO = {
  startAddress: AddressUI;
  endAddress: AddressUI;

  departureAt: string;
  arrivalAt?: string;

  capacityKg: number;

  totalVolumeCm3: number;

  allowedPackageDimensions: {
    maxLengthCm: number;
    maxWidthCm: number;
    maxHeightCm: number;
  };

  pricePerKg?: number;

  modeOfTransport: TransportMode;

  description?: string;
};

export interface TripOrderUI {
  id: string;

  customerName: string;

  pickupCity: string;
  deliveryCity: string;

  weightKg: number;
  amount: number;

  status: string;
}


export interface TripEarningsUI {
  total: number;
  completed: number;
  pending: number;
}

export interface TripDetailsUI {
  id: string;

  startCity: string;
  endCity: string;

  departureAt: string;
  arrivalAt?: string;

  modeOfTransport: string;

  capacityKg: number;
  remainingCapacityKg: number;

  totalVolumeCm3: number;
  remainingVolumeCm3: number;

  allowedPackageDimensions: {
    maxLengthCm: number;
    maxWidthCm: number;
    maxHeightCm: number;
  };

  description?: string;

  status: string;

  createdAt: string;

  orders: TripOrderUI[];

  earnings: TripEarningsUI;

  stats: {
    totalOrders: number;
    deliveredOrders: number;
    activeOrders: number;
    cancelledOrders: number;
  };
}
