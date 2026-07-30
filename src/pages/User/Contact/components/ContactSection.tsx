import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
    Mail,
    MapPin,
    Clock3,
    Send,
} from "lucide-react";

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "carrygoo7@gmail.com",
        description: "For project discussions and general inquiries.",
    },
    {
        icon: MapPin,
        title: "Location",
        value: "Kerala, India",
        description: "Available for remote collaboration.",
    },
    {
        icon: Clock3,
        title: "Response Time",
        value: "24 - 48 Hours",
        description: "I'll respond as soon as possible.",
    },
];

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email address"),

    subject: z
        .string()
        .trim()
        .min(3, "Subject must be at least 3 characters"),

    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters"),
});


export const sendContactEmail = async (
    data: ContactFormData
): Promise<void> => {
    await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
};

export type ContactSchema = z.infer<typeof contactSchema>;

const ContactSection = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactSchema) => {
        try {
            setLoading(true);
            setSuccess("");
            setError("");

            await sendContactEmail(data);

            setSuccess("Your message has been sent successfully.");
            reset();
        } catch (err) {
            console.error(err);
            setError("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <section
            id="contact"
            className="bg-slate-900 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left Side */}
                    <div>
                        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                            Contact Information
                        </span>

                        <h2 className="mt-6 text-4xl font-black text-white">
                            Let's Start a Conversation
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            If you have questions about CarryGo, suggestions for improvement,
                            or would like to discuss software development opportunities,
                            feel free to reach out.
                        </p>

                        <div className="mt-10 space-y-6">
                            {contactInfo.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-950 p-6"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                                        <item.icon className="h-7 w-7 text-blue-400" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 font-medium text-blue-400">
                                            {item.value}
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
                        <h3 className="text-2xl font-bold text-white">
                            Send a Message
                        </h3>

                        <p className="mt-3 text-slate-400">
                            Fill out the form below and I'll get back to you as soon as
                            possible.
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 space-y-6"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Full Name
                                </label>

                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Subject
                                </label>

                                <input
                                    {...register("subject")}
                                    type="text"
                                    placeholder="Project Discussion"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                                />

                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Message
                                </label>

                                <textarea
                                    {...register("message")}
                                    rows={6}
                                    placeholder="Write your message..."
                                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                                />

                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <Send className="h-5 w-5" />
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                            {success && (
                                <p className="text-center text-green-500">
                                    {success}
                                </p>
                            )}

                            {error && (
                                <p className="text-center text-red-500">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;