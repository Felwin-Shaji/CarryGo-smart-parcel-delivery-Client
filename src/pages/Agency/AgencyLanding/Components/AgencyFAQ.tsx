import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can register as a CarryGo agency?",
    answer:
      "Any registered logistics, courier, or parcel delivery business can apply to become a CarryGo agency. After verification, you'll gain access to the agency dashboard.",
  },
  {
    question: "How long does the verification process take?",
    answer:
      "Most agencies are verified within 24–48 hours after submitting the required documents.",
  },
  {
    question: "Can I manage multiple hubs?",
    answer:
      "Yes. CarryGo allows you to create and manage multiple hubs, assign workers, and monitor operations from a single dashboard.",
  },
  {
    question: "How do agencies receive payments?",
    answer:
      "Payments are securely processed through CarryGo and transferred to your registered account with complete transaction history.",
  },
  {
    question: "Can I track every parcel?",
    answer:
      "Absolutely. Every booking includes live parcel tracking, delivery status updates, and complete shipment history.",
  },
  {
    question: "Is there any joining fee?",
    answer:
      "No. Registration is free. Agencies only pay platform fees according to completed bookings.",
  },
];

export default function AgencyFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="bg-[#081225] py-28"
    >
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-400">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Got Questions?
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Everything you need to know before partnering with CarryGo.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {
            const active = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
              >
                <button
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition duration-300 ${
                      active ? "rotate-180 text-yellow-400" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    active
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-8 pb-6 leading-8 text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}