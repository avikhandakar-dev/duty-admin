import { refundOrder } from "@lib/api";
import { formatStatus } from "@lib/utils";
import { useState } from "react";
import { toast } from "react-hot-toast";

const OrderDetailsCard = ({ orderDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const activeGig = orderDetails.gigId
    ? orderDetails.service.gigs.find((gig) => gig.id === orderDetails.gigId)
    : orderDetails.service.gigs.find((gig) => gig.type === orderDetails.type);
  const refundOrderFn = async () => {
    const answer = prompt("Please enter 'Refund Order'");
    if (answer !== "Refund Order") return toast.error("Incorrect!");
    setIsLoading(true);
    try {
      await refundOrder({
        orderId: orderDetails.id,
      });
      toast.success("Success!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl h-full border border-primary rounded">
      <figure className="w-full h-48">
        <img className="object-cover w-full h-full" src={activeGig.images[0]} />
      </figure>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">ID</span>
          <span className=" opacity-50">{orderDetails.id}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Type</span>
          <span className=" opacity-50">{orderDetails.type}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Amount</span>
          <span className=" opacity-50">
            {orderDetails.offerPrice || orderDetails.amount}
          </span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Status</span>
          <span className=" opacity-50">
            {formatStatus(orderDetails.status)}
          </span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Paid</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={orderDetails.paid}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Date</span>
          <span className=" opacity-50">Jun, 1, 2023</span>
        </div>
        <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Description</span>
          <span className=" opacity-50">
            {orderDetails.description || "N/A"}
          </span>
        </div>
        <div className="card-actions justify-end mt-2">
          <button
            onClick={refundOrderFn}
            className={`btn btn-primary btn-wide ${isLoading && "loading"}`}
          >
            Cancel And Refund Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
