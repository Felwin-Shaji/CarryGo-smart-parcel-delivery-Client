import {
    BadgeCheck,
    MapPinned,
    Package,
    Route,
    Truck,
} from "lucide-react";

import type { TimelineStepItem } from "./types";

export const TIMELINE_STEPS: TimelineStepItem[] = [
    {
        id: 1,
        title: "Book a Delivery",
        description:
            "Enter your pickup and destination details in just a few simple steps.",
        icon: Package,
    },
    {
        id: 2,
        title: "Choose Delivery",
        description:
            "Select the delivery option that best matches your schedule and needs.",
        icon: Route,
    },
    {
        id: 3,
        title: "Parcel Pickup",
        description:
            "Your parcel is collected and prepared for its journey.",
        icon: Truck,
    },
    {
        id: 4,
        title: "Track Anytime",
        description:
            "Follow your parcel in real time from pickup to delivery.",
        icon: MapPinned,
    },
    {
        id: 5,
        title: "Delivered",
        description:
            "Your parcel reaches its destination safely and securely.",
        icon: BadgeCheck,
    },
];