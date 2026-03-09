const RouteDetails = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h3 className="font-semibold mb-4">Route Details</h3>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-blue-500 text-sm">PICKUP</p>
          <p>23, Hill Road, Kotagiri</p>
          <p className="text-gray-500 text-sm">
            Kotagiri, Tamil Nadu – 643216
          </p>
        </div>

        <div>
          <p className="text-green-500 text-sm">DELIVERY</p>
          <p>45, Station Road, Ongole</p>
          <p className="text-gray-500 text-sm">
            Ongole, Andhra Pradesh – 523001
          </p>
        </div>

      </div>

      <div className="bg-gray-100 rounded-lg mt-6 p-3 text-sm">
        Distance: <span className="font-semibold">425 km</span>
      </div>

    </div>
  );
};

export default RouteDetails;