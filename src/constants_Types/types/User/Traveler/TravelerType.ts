import type { AddressUI } from "../../../../context/Booking/Booking.types";
import type { BaseUserDTO } from "../../BaseTypes/baseTypes.dto";

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

export type TravelerActionStatus =
  | "PAID_PENDING_PICKUP"
  | "READY_FOR_PICKUP"
  | "PICKUP_STARTED"
  | "IN_TRANSIT"
  | "DELIVERED";


export interface TripOrderUI {
  id: string;
  customerDetails: Omit<BaseUserDTO, "isBlocked" | "kycStatus" | "createdAt">;

  pickupAddress: AddressUI;
  deliveryAddress: AddressUI;

  weightKg: number;
  amount: number;
  platformFee:number;
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
