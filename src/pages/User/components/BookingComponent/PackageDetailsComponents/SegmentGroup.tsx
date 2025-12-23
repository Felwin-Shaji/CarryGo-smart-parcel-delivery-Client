//segment group
export const SegmentGroup = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex flex-wrap gap-2">
    {children}
  </div>
);

//Segments
export const Segment = ({
  id,
  value,
  setValue,
}: {
  id: any;
  value: any;
  setValue: (v: any) => void;
}) => {
  const active = value === id;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setValue(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setValue(id);
      }}
      className={`
        px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer
        transition
        ${
          active
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {id}
    </div>
  );
};
