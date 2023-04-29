const ProviderInfo = ({ provider }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-max border border-warning rounded">
      <div className="px-4 py-3 bg-warning text-warning-content card-title">
        Provider Info
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Name</span>
          <span className=" opacity-50">{provider.name}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Title</span>
          <span className=" opacity-50">{provider.title}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Gender</span>
          <span className=" opacity-50">{provider.gender}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Position</span>
          <span className=" opacity-50">{provider.position}</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;
