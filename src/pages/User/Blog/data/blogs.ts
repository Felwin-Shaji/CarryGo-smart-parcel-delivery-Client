import type { Blog } from "../types/blog";
import {
    Truck,
    PackageSearch,
    Workflow,
    Cloud,
} from "lucide-react";

export const blogs: Blog[] = [
    {
        id: "building-carrygo",
        title: "Building CarryGo: From Idea to Deployment",
        description:
            "Explore how CarryGo was designed and built using the MERN stack, Clean Architecture, Docker, AWS, and TypeScript.",
        category: "Development",
        readTime: "8 min read",
        featured: true,
        date: "July 2026",
        icon: Truck,
    },
    {
        id: "parcel-tracking",
        title: "How Parcel Tracking Works",
        description:
            "Learn how parcels move from booking to delivery using agencies, hubs, workers, and real-time tracking.",
        category: "Logistics",
        readTime: "5 min read",
        date: "July 2026",
        icon: PackageSearch,
    },
    {
        id: "clean-architecture",
        title: "Why I Chose Clean Architecture",
        description:
            "Discover why separating business logic from frameworks makes applications easier to maintain and scale.",
        category: "Architecture",
        readTime: "7 min read",
        date: "July 2026",
        icon: Workflow,
    },
    {
        id: "aws-deployment",
        title: "Deploying CarryGo on AWS",
        description:
            "A walkthrough of deploying a MERN application using Docker, Nginx, SSL, EC2, and CloudFront.",
        category: "DevOps",
        readTime: "10 min read",
        date: "July 2026",
        icon: Cloud,
    },
];