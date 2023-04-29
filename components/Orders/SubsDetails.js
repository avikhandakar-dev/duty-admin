const SubsDetails = ({ subsData }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-warning rounded">
      <div className="px-4 py-3 bg-warning text-warning-content card-title">
        Subscription Details
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Amount</span>
          <span className=" opacity-50">{subsData.amount}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Subscription Type</span>
          <span className=" opacity-50">{subsData.subscriptionType}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Pay As You Go</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked={subsData.payAsYouGo}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Other Charge</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked={subsData.otherCharge}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Other Charge Name</span>
          <span className="opacity-50">
            {subsData.otherChargeName || "N/A"}
          </span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Other Charge Amoount</span>
          <span className="opacity-50">{subsData.otherChargeAmount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default SubsDetails;
