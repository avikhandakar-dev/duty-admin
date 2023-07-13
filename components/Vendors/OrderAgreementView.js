const OrderAgreementView = ({ agreement, goBack }) => {
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
        return `My Self`;
      }
      case "Courier Service": {
        return `Courier Service || ${agreement.courierServiceName}, ${agreement.courierServiceAreaName}`;
      }
      case "Our Employees": {
        return "Our Employees";
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
        <div className="">
          <div className="border-b border-[#e4e4e4] py-6 space-y-6">
            <div>
              <div className="font-medium px-6 rounded-md py-2 bg-gray-700">
                <span>
                  What type of service or item are you providing to this
                  customer?
                </span>
              </div>
              <div className="mt-4 space-y-4 pl-6">
                {agreement.serviceType == "Other"
                  ? agreement.otherServiceType
                  : agreement.serviceType}
              </div>
            </div>

            <div>
              <div className="font-medium px-6 rounded-md py-2 bg-gray-700">
                <span>How would you like this service to be delivered?</span>
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
              <div className="font-medium px-6 rounded-md py-2 bg-gray-700">
                <span>Delivery Method</span>
                {agreement.deliverBy == "Physical" && (
                  <div className="text-red-500 mt-2">
                    For physical services, you are required to deliver your
                    service in person, face to face with the buyer. For more
                    details, please refer to our{" "}
                    <a
                      href="/legal/order-policy"
                      target="_blank"
                      className="link link-hover text-indigo-500"
                    >
                      Order & delivery Policy
                    </a>{" "}
                    section
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-4 pl-6">
                {agreement.deliverBy == "Online"
                  ? getDeliverMethodOnline()
                  : getDeliverMethodPhysical()}
              </div>
            </div>

            <div>
              <div className="font-medium px-6 rounded-md py-2 bg-gray-700">
                <span>Agreement That You Accepted</span>
              </div>
              <div className="mt-4 space-y-4 pl-6">
                <div className="flex items-center">
                  <img
                    className="h-10"
                    src="http://duty.com.bd/Assets/icon/rigth-mark.svg"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Yes, I have collected all the necessary information and
                    understand what my customer wants.
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-10"
                    src="http://duty.com.bd/Assets/icon/rigth-mark.svg"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    If I provide a physical service, I will deliver it face to
                    face and use a mask.
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-10"
                    src="http://duty.com.bd/Assets/icon/rigth-mark.svg"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    I will save all delivery proof documents for future
                    inquiries
                  </span>
                </div>
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
      </div>
    </>
  );
};

export default OrderAgreementView;
