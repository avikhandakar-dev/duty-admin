const Aggregation = ({ data }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-secondary rounded">
      <div className="px-4 py-3 bg-secondary text-secondary-content card-title">
        Aggregation
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Appointment</span>
          <span className=" opacity-50">{data.Appointment}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Liked Gigs</span>
          <span className=" opacity-50">{data.likedGigs}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Messages</span>
          <span className=" opacity-50">{data.messages}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Reviews</span>
          <span className=" opacity-50">{data.reviews}</span>
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
