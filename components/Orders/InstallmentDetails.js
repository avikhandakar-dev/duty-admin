const InstallmentDetails = ({ installmentData }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-warning rounded">
      <div className="px-4 py-3 bg-warning text-warning-content card-title">
        Installment Details
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Total Amount</span>
          <span className=" opacity-50">{installmentData.totalAmount}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Type</span>
          <span className=" opacity-50">{installmentData.installmentType}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Total Installment</span>
          <span className=" opacity-50">
            {installmentData.installmentCount}
          </span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Advanced</span>
          <span className=" opacity-50">
            {installmentData.advancedPayment
              ? installmentData.advancedPaymentAmount
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstallmentDetails;
