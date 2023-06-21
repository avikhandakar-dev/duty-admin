const ContactDetails = ({ contact }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-primary rounded">
      <div className="px-4 py-3 bg-primary text-primary-content card-title">
        Details
      </div>
      <div className="card-body">
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Name</span>
          <span className=" opacity-50">{contact.name}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Email</span>
          <span className=" opacity-50">{contact.email}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Phone</span>
          <span className=" opacity-50">{contact.phone || "-"}</span>
        </div>
        <div className="flex flex-col border-b pb-1 border-slate-800">
          <span className="font-semibold">Message</span>
          <span className=" opacity-50">{contact.message || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
