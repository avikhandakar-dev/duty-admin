import { formatSelectedServices } from "@lib/utils";

const ServiceViewer = ({ selectedServices, facilites }) => {
  const services = selectedServices
    ? formatSelectedServices(selectedServices)
    : [];
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-warning rounded">
      <div className="px-4 py-3 bg-warning text-warning-content card-title">
        Selected Services
      </div>
      <div className="card-body max-w-xl mx-auto">
        <div>
          <div className="flex gap-4 flex-wrap">
            {services?.map((service, index) => (
              <div
                key={service.id}
                className="badge badge-warning badge-outline badge-lg"
              >
                {index + 1}. {service}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2">Extra facilities</p>
          <div className="flex gap-4 flex-wrap">
            {facilites?.length > 0 ? (
              <div className="flex flex-wrap gap-x-4 mt-2 pr-4">
                {facilites.map((item, index) => (
                  <span key={index} className="text-sm">
                    {item.title}
                    {facilites.length > index + 1 && ", "}
                  </span>
                ))}
              </div>
            ) : (
              <p>No extra facilites</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceViewer;
