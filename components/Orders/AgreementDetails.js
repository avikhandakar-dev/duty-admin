const AgreementDetails = ({ agreement, goBack }) => {
  const getDeliverMethodOnline = () => {
    switch (agreement.deliverMethodOnline) {
      case "Online File Share": {
        return `Online File Share | ${agreement.fileSharePlatformName}`;
      }
      case "Deliver In Video/Voice Call": {
        return `Video/Voice Call | ${agreement.callPlatformName}`;
      }
      case "Delivered In Another Platform": {
        return `${agreement.anotherPlatformName}`;
      }
      case "Other": {
        return `${agreement.otherPlatformNameOnline}`;
      }
      default:
        return null;
    }
  };
  const getDeliverMethodPhysical = () => {
    switch (agreement.deliverMethodPhysical) {
      case "My Self": {
        return `My Self | ${agreement.selfDeliverMethod}`;
      }
      case "Courier Service": {
        return `Courier Service || ${agreement.courierServiceName}, ${agreement.courierServiceAreaName}`;
      }
      case "Labor": {
        return "Labor";
      }
      case "Other": {
        return agreement.otherDeliverMethodPhysical;
      }
      default:
        return null;
    }
  };
  return (
    <>
      <div className="space-y-8 max-w-3xl mx-auto mt-8 mb-16">
        <div className="py-6 space-y-6">
          <div>
            <div className="alert alert-success shadow-lg">
              <span>What Type Of Service/Item Vendor Want To Give</span>
            </div>
            <div className="mt-4 space-y-4 pl-6">
              {agreement.serviceType == "Other"
                ? agreement.otherServiceType
                : agreement.serviceType}
            </div>
          </div>

          <div>
            <div className="alert alert-success shadow-lg">
              <span>Service Deliver By</span>
            </div>
            <div className="mt-4 pl-6 flex gap-6">
              <span
                className={`py-3 px-4 rounded-md w-48 bg-[#535353] text-white`}
              >
                {agreement.deliverBy}
              </span>
            </div>
          </div>
          <div>
            <div className="alert alert-success shadow-lg">
              <span>Delivery Method</span>
            </div>
            <div className="mt-4 space-y-4 pl-6">
              {agreement.deliverBy == "Online"
                ? getDeliverMethodOnline()
                : getDeliverMethodPhysical()}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={goBack}
          className="btn btn-primary btn-outline capitalize btn-wide"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default AgreementDetails;
