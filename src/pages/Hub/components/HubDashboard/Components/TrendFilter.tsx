import { Calendar, X } from "lucide-react";

type TrendFilterProps = {
    fromDate: string;
    toDate: string;
    onChangeFrom: (val: string) => void;
    onChangeTo: (val: string) => void;
    onApply: () => void;
    onClear: () => void;
};

export const TrendFilter = ({
    fromDate,
    toDate,
    onChangeFrom,
    onChangeTo,
    onApply,
    onClear,
}: TrendFilterProps) => {

    const isInvalidRange = !!fromDate && !!toDate && new Date(fromDate) > new Date(toDate);

    const isDisabled = !fromDate || !toDate || isInvalidRange;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">

                {/* From */}
                <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => onChangeFrom(e.target.value)}
                        className="
                        h-8 pl-7 pr-2 w-[130px]
                        text-xs
                        border border-gray-200 rounded-lg
                        bg-white
                        focus:outline-none focus:ring-1 focus:ring-blue-500
                    "
                    />
                </div>

                {/* To */}
                <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => onChangeTo(e.target.value)}
                        className="
                        h-8 pl-7 pr-2 w-[130px]
                        text-xs
                        border border-gray-200 rounded-lg
                        bg-white
                        focus:outline-none focus:ring-1 focus:ring-blue-500
                    "
                    />
                </div>


                {/* Apply */}
                <button
                    onClick={onApply}
                    disabled={isDisabled}
                    className="
                    inline-flex items-center justify-center
                    h-8 px-3
                    text-xs font-semibold text-white
                    rounded-xl
                    
                    bg-gradient-to-r from-blue-600 to-blue-500
                    shadow-md shadow-blue-500/20
                    
                    hover:from-blue-700 hover:to-blue-600
                    hover:shadow-lg hover:shadow-blue-500/30

                    active:scale-95
                    transition-all duration-200

                    disabled:opacity-40 disabled:cursor-not-allowed
                    "
                >
                    Apply
                </button>

                {/* Clear */}
                <button
                    onClick={onClear}
                    className="
                    group inline-flex items-center justify-center
                    h-8 px-2
                    rounded-xl
                    
                    bg-gradient-to-r from-blue-400 to-blue-300
                    shadow-md shadow-blue-500/20

                    hover:from-blue-700 hover:to-blue-600
                    hover:shadow-lg hover:shadow-blue-500/30

                    active:scale-95
                    transition-all duration-200
                    "
                >
                    <X
                        size={14}
                        strokeWidth={2.5}
                        className="text-white"
                    />
                </button>
            </div>

            {isInvalidRange && (
                <p className="text-xs text-red-500 ml-1">
                    From date cannot be greater than To date
                </p>
            )}
        </div>
    );
};