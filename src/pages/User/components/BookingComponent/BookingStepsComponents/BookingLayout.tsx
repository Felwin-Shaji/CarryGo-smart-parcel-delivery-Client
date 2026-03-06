interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

const BookingLayout = ({ left, right }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-5 gap-8">
      <div className="col-span-3">{left}</div>
      <div className="col-span-2">{right}</div>
    </div>
  );
};

export default BookingLayout;