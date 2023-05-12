const SupportDetails = ({ support }) => {
  console.log(support);
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
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Service Id</span>
          <span className=" opacity-50">{support.serviceId || "-"}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Reply From Duty</span>
          <span className=" opacity-50">{support.repliedText || "-"}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Image</span>
          {support.image ? (
            <a className="btn btn-warning btn-sm" href={support.image} download>
              Download
            </a>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDetails;
