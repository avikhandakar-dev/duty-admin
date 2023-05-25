import { useState } from "react";
import AgreementModal from "./AgreementModal";

const MoreInfo = ({ orderDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="card w-96 bg-base-200 shadow-xl overflow-hidden h-full border border-secondary rounded">
        <div className="px-4 py-3 bg-secondary text-primary-content card-title">
          More Info!
        </div>
        <div className="card-body">
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Ordered By</span>
            <span className=" opacity-50">{orderDetails.orderedBy}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Accepted</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={
                orderDetails.status === "WAITING_FOR_ACCEPT" ? false : true
              }
            />
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Delivered</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={orderDetails.delivered}
            />
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Received</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={orderDetails.received}
            />
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Delivery Date From</span>
            <span className=" opacity-50">
              {orderDetails.deliveryDateFrom || "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Delivery Date To</span>
            <span className=" opacity-50">
              {orderDetails.deliveryDateTo || "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Delivered At</span>
            <span className=" opacity-50">
              {orderDetails.deliveredAt || "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Request Date</span>
            <span className=" opacity-50">
              {orderDetails.requestedDeliveryDate || "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Attachment</span>
            {orderDetails.attachment ? (
              <a
                className="badge badge-primary cursor-pointer"
                href={orderDetails.attachment}
                target="_blank"
                download
                rel="noreferrer"
              >
                Download
              </a>
            ) : (
              <span className=" opacity-50">N/A</span>
            )}
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Agreement</span>
            <span
              onClick={() => setIsOpen(true)}
              className="badge badge-primary cursor-pointer"
            >
              View
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Proof</span>
            {orderDetails.proofImage ? (
              <a
                className="badge badge-primary cursor-pointer"
                href={orderDetails.proofImage}
                target="_blank"
                download
                rel="noreferrer"
              >
                Download
              </a>
            ) : (
              <span className=" opacity-50">N/A</span>
            )}
          </div>
          <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
            <span className="font-semibold">Proof Text</span>
            <span className=" opacity-50">
              {orderDetails.proofText || "N/A"}
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <AgreementModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          agreement={orderDetails.agreement}
        />
      )}
    </>
  );
};

export default MoreInfo;
