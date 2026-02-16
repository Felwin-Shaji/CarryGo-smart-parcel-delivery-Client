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

  allowedPackageSizes: string[];

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
