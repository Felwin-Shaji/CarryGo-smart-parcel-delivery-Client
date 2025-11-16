const KYCRejected = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="text-center p-5">
      <h1>Your KYC was Rejected</h1>
      <p>Please resubmit your documents.</p>
      <button onClick={handleRetry} className="bg-red-500 text-white px-4 py-2 rounded">
        Re-submit KYC
      </button>
    </div>
  );
};

export default KYCRejected;
