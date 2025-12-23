const CenteredCard = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center">
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg px-6 py-10">
      {children}
    </div>
  </div>
);

export default CenteredCard