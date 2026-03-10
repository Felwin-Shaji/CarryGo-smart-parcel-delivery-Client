import * as Yup from "yup";
import type { AddressUI } from "../context/Booking/Booking.types";

export const travelRequestValidationSchema = () =>
  Yup.object({

    startAddress: Yup.object()
      .nullable()
      .required("Pickup address is required"),

endAddress: Yup.object()
  .nullable()
  .required("Destination address is required")
  .test(
    "different-address",
    "Pickup and destination cannot be the same",
    function (value) {
      const startAddress = this.parent.startAddress as AddressUI | null;
      const endAddress = value as AddressUI | null;

      if (!startAddress || !endAddress) return true;

      return (
        endAddress.location.lat !== startAddress.location.lat ||
        endAddress.location.lng !== startAddress.location.lng
      );
    }
  ),

    departureAt: Yup.date()
      .required("Departure time is required"),

    arrivalAt: Yup.date()
      .nullable()
      .min(
        Yup.ref("departureAt"),
        "Arrival must be after departure"
      ),

    capacityKg: Yup.number()
      .typeError("Capacity must be a number")
      .min(1, "Minimum capacity is 1 kg")
      .required("Capacity is required"),

    totalVolumeCm3: Yup.number()
      .typeError("Volume must be a number")
      .min(1, "Volume must be greater than 0")
      .required("Volume is required"),

    allowedPackageDimensions: Yup.object({
      maxLengthCm: Yup.number()
        .typeError("Length must be a number")
        .min(1, "Length must be greater than 0")
        .required("Length is required"),

      maxWidthCm: Yup.number()
        .typeError("Width must be a number")
        .min(1, "Width must be greater than 0")
        .required("Width is required"),

      maxHeightCm: Yup.number()
        .typeError("Height must be a number")
        .min(1, "Height must be greater than 0")
        .required("Height is required"),
    }),

    modeOfTransport: Yup.string()
      .required("Transport mode is required"),

    description: Yup.string()
      .max(500, "Description cannot exceed 500 characters"),
  });