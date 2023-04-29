const Aggregation = ({ data }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-secondary rounded">
      <div className="px-4 py-3 bg-secondary text-secondary-content card-title">
        Aggregation
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Services</span>
          <span className=" opacity-50">{data.services}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">OnlineMember</span>
          <span className=" opacity-50">{data.OnlineMember}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Appointment</span>
          <span className=" opacity-50">{data.Appointment}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Notice</span>
          <span className=" opacity-50">{data.Notice}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Order</span>
          <span className=" opacity-50">{data.Order}</span>
        </div>
      </div>
    </div>
  );
};

export default Aggregation;
