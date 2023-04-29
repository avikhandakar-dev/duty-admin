const SupportDetails = ({ support }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-primary rounded">
      <div className="px-4 py-3 bg-primary text-primary-content card-title">
        Details
      </div>
      <div className="card-body">
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Subject</span>
          <span className=" opacity-50">{support.subject}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Details</span>
          <span className=" opacity-50">{support.message}</span>
        </div>
      </div>
    </div>
  );
};

export default SupportDetails;
