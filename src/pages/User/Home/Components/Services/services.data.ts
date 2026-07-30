import {
    MapPinned,
    Package,
    Truck,
} from "lucide-react";
import type { ServiceItem } from "./types";


export const SERVICES: ServiceItem[] = [
    {
        title: "Book a Delivery",
        description:
            "Choose the delivery option that fits your needs and schedule a pickup in just a few steps.",
        buttonText: "Book Now",
        path: "/booking",
        protected: true,
        icon: Package,
    },
    {
        title: "Track a Parcel",
        description:
            "Stay updated with your parcel's journey using real-time tracking from pickup to delivery.",
        buttonText: "Track Parcel",
        path: "/tracking",
        icon: MapPinned,
    },
    {
        title: "Become a Traveler",
        description:
            "Traveling between cities? Deliver parcels along your route and earn extra income.",
        buttonText: "Apply Now",
        path: "/traveler",
        protected: true,
        icon: Truck,
    },
];