import { Field, ErrorMessage } from "formik";
import { FileText } from "lucide-react";
import SectionCard from "./SectionCard";

const NotesSection = () => {
    return (
        <SectionCard
            icon={<FileText size={18} />}
            title="ADDITIONAL NOTES"
            subtitle="Any special instructions for senders?"
        >
            <div className="space-y-2">
                <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="e.g. I can pick up from the bus station. No liquids please."
                    className="w-full border rounded-xl px-4 py-3 resize-none"
                />

                <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-xs"
                />
            </div>
        </SectionCard>
    );
};

export default NotesSection;