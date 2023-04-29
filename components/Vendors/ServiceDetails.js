import BanServiceForm from "@components/Forms/BanServiceForm";
import { unbannedOrder, unbannedService } from "@lib/api";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ServiceDetails = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannedUntil, setBannedUntil] = useState(service.bannedUntil);
  const [bannedReason, setBannedReason] = useState(service.bannedReason);
  const [bannedType, setBannedType] = useState(
    service.bannedUntil ? "service" : service.orderBannedUntil ? "order" : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const unbannedServiceFn = async () => {
    const userAction = confirm(`Are you sure you want to unban this service?`);
    if (!userAction) return;
    try {
      setIsLoading(true);
      await unbannedService({
        serviceId: service.id,
      });
      toast.success("Successfully unbanned service!");
      setBannedUntil(null);
      setBannedReason(null);
      setBannedType(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const unbannedOrderFn = async () => {
    const userAction = confirm(`Are you sure you want to unban this service?`);
    if (!userAction) return;
    try {
      setIsLoading(true);
      await unbannedOrder({
        serviceId: service.id,
      });
      toast.success("Successfully unbanned service!");
      setBannedUntil(null);
      setBannedReason(null);
      setBannedType(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card w-full bg-base-200 shadow-xl h-full border border-primary rounded">
        {service.wallPhoto && (
          <figure className="w-full h-48">
            <img
              className="object-cover w-full h-full"
              src={service.wallPhoto}
            />
          </figure>
        )}
        <div className="card-body">
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">ServiceCenter Name</span>
            <span className=" opacity-50">{service.serviceCenterName}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Category</span>
            <span className=" opacity-50">{service.category}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Worker</span>
            <span className=" opacity-50">{service.worker}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Start Date</span>
            <span className=" opacity-50">{service.startDate}</span>
          </div>
          <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">About</span>
            <span className=" opacity-50">{service.about || "N/A"}</span>
          </div>

          <div className="mt-8">
            {!bannedUntil ? (
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-warning btn-outline"
              >
                Ban This Service
              </button>
            ) : bannedType === "service" ? (
              <div>
                <p className="text-error">
                  This service has been banned until{" "}
                  <span className="underline font-bold">
                    {moment(bannedUntil).format("Do MMMM, h:mm A")}
                  </span>
                </p>
                <p>{`Reason : ${bannedReason || "No reason"}`}</p>
                <button
                  onClick={unbannedServiceFn}
                  className={`btn btn-success btn-outline mt-4 ${
                    isLoading && "loading"
                  }`}
                >
                  Unban This Service
                </button>
              </div>
            ) : (
              <div>
                <p className="text-error">
                  This service's order has been banned until{" "}
                  <span className="underline font-bold">
                    {moment(bannedUntil).format("Do MMMM, h:mm A")}
                  </span>
                </p>
                <p>{`Reason : ${bannedReason || "No reason"}`}</p>
                <button
                  onClick={unbannedOrderFn}
                  className={`btn btn-success btn-outline mt-4 ${
                    isLoading && "loading"
                  }`}
                >
                  Unban This Service's Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <BanServiceForm
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          isSuccess={(data) => {
            setBannedType(data.type);
            setBannedUntil(data.bannedUntil);
            setBannedReason(data.bannedReason);
          }}
          serviceId={service.id}
        />
      )}
    </>
  );
};

export default ServiceDetails;
