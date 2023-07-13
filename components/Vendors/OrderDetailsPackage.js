import { refundOrder } from "@lib/api";
import { dutyFee, getUrlExtension } from "@lib/utils";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFileImage } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FiFileText } from "react-icons/fi";
import { GoMailRead } from "react-icons/go";
import OrderAgreementView from "./OrderAgreementView";

const OrderDetailsPackage = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showAgreementView, setShowAgreementView] = useState(false);

  const refundOrderFn = async () => {
    const answer = prompt("Please enter 'Refund Order'");
    if (answer !== "Refund Order") return toast.error("Incorrect!");
    setIsLoading(true);
    try {
      await refundOrder({
        orderId: order.id,
      });
      toast.success("Success!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelStatus = () => {
    if (order.cancelStatus) {
      return order.cancelStatus;
    } else if (order.cancelledBy === "VENDOR") {
      return "The seller has canceled this order";
    } else {
      return "You have canceled this order";
    }
  };

  const formatPaymentStatus = () => {
    switch (order.paymentStatus) {
      case "DUE": {
        return <span className="text-red-500">Due</span>;
      }
      case "REFUNDED": {
        return <span className="text-pink-500">Refunded</span>;
      }
      case "PAID": {
        return <span className="text-green-500">Paid</span>;
      }
      default:
        return <span className="text-gray-500">{order.paymentStatus}</span>;
    }
  };

  const formatOrderStatus = () => {
    switch (order.status) {
      case "WAITING_FOR_ACCEPT": {
        return (
          <span className="flex items-center justify-center text-gray-500 gap-4">
            Wait for Accept Your Orde{" "}
            <img className="w-5" src="/Assets/icon/waiting.svg" />
          </span>
        );
      }
      case "CANCELLED": {
        return (
          <span className="text-red-500">
            {order.paid ? "Failed" : "Cancel"}
          </span>
        );
      }
      case "ACCEPTED": {
        return <span className="text-gray-500">Accepted</span>;
      }
      case "DELIVERED": {
        return <p className="text-green-500 font-medium">Delivered</p>;
      }
      case "COMPLETED": {
        return <p className="text-green-500 font-medium">Order Completed</p>;
      }
      default:
        return order.status;
    }
  };

  if (showReviewScreen) {
    // return <GiveReview orderId={order.id} />;
  }

  if (showAgreementView) {
    return (
      <OrderAgreementView
        agreement={order.agreement}
        goBack={() => setShowAgreementView(false)}
      />
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <div className="text-center border-b border-[#ececec] mt-8 flex justify-between items-baseline">
          <span className="text-sm text-gray-500">Order ID : {order.id}</span>
          <p className="text-primary pb-2 text-2xl border-b border-primary w-max mx-auto mr-[30%]">
            Package - {order.selectedPackage.name}
          </p>
          {order.status !== "WAITING_FOR_ACCEPT" && (
            <CgFileDocument
              className="text-2xl cursor-pointer text-primary"
              onClick={() => setShowAgreementView(true)}
            />
          )}
        </div>
        <div className="">
          <div
            className={`flex justify-between items-center ${
              order.status === "WAITING_FOR_ACCEPT" && "border-b"
            }  border-[#ececec]`}
          >
            <div className="flex gap-4 items-center">
              <div className="items-center relative w-12 aspect-square overflow-hidden rounded-full">
                <Image
                  src={
                    order.service?.profilePhoto ||
                    "/Assets/images/service/user.svg"
                  }
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <a className="text-sm">
                <p className="font-medium">
                  {order.service?.serviceCenterName}
                </p>
                <p>
                  {order.service?.providerInfo?.title}{" "}
                  {order.service?.providerInfo?.name}{" "}
                  <span className="uppercase text-gray-500">
                    ({order.service?.providerInfo?.gender})
                  </span>
                </p>
                <p className="text-gray-500">
                  ({order.service?.providerInfo?.position})
                </p>
              </a>
            </div>
            <div className="scale-75 origin-top-right h-max mt-6">
              {/* <Barcode
                width={1.5}
                height={40}
                text={order.id.toUpperCase()}
                value={order.id}
              /> */}
              <p className="text-center">
                Date : {moment(order?.createdAt).format("Do MMMM, h:mm A")}
              </p>
            </div>
          </div>
          {order.status === "WAITING_FOR_ACCEPT" ? (
            <div>
              <div className="text-center py-8 border-b border-[#ececec] space-y-4">
                <div className="border-b pb-6">
                  <p className="text-[20px] mb-3">Service/Item name</p>
                  <p className="text-red-500">
                    please give clear instructions to the seller via chat. They
                    will add the services to your receipt as per your
                    requirements.
                  </p>
                </div>
                <div className="text-center text-sm border-b pb-6">
                  <p className="text-[20px] mb-2 mt-6">Price</p>
                  <p className="">
                    Service price <span className="pl-4">{order.amount}৳</span>
                  </p>
                  <p className="">
                    Duty fee {order.dutyFee * 100}%{" "}
                    <span className="pl-4">
                      +{dutyFee(order.dutyFee, order.amount)}৳
                    </span>
                  </p>
                  <p className="text-[20px] font-medium mt-4">
                    Total Pay{" "}
                    <span className="pl-4">
                      {order.amount +
                        Number(dutyFee(order.dutyFee, order.amount))}
                      ৳
                    </span>
                  </p>
                </div>
                <div className="text-center text-sm border-b pb-6">
                  <p className="text-lg ">Delivery Date</p>
                  <div className="flex items-center gap-4 justify-center text-gray-500">
                    <span>{order.deliveryDateFrom}</span> <span>to</span>
                    <span>{order.deliveryDateTo}</span>
                  </div>
                </div>
                <div className="text-center text-sm border-b pb-6">
                  <p className="text-lg ">Payment Status</p>
                  <p className="text-gray-500">{order.paid ? "paid" : "Due"}</p>
                </div>
                <div className="text-center text-sm">
                  <p className="text-lg ">Service Status</p>
                  {formatOrderStatus()}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <p className="text-lg font-medium border-b">
                  Service /Item Name
                </p>
                <div className="grid grid-cols-2 mt-2 border-b pb-2 divide-x">
                  <div>
                    <p className="mb-3">{order.gigTitle}</p>
                    <p>{order.selectedServices?.join(", ")}</p>
                  </div>

                  <div>
                    <div className="text-center text-sm border-b pb-6">
                      <p className="text-[20px] mb-2 mt-6">Price</p>
                      <p className="">
                        Service price{" "}
                        <span className="pl-4">{order.amount}৳</span>
                      </p>
                      <p className="">
                        Duty fee {order.dutyFee * 100}%{" "}
                        <span className="pl-4">
                          +{dutyFee(order.dutyFee, order.amount)}৳
                        </span>
                      </p>
                      <p className="text-[20px] font-medium mt-4">
                        Total Pay{" "}
                        <span className="pl-4">
                          {order.amount +
                            Number(dutyFee(order.dutyFee, order.amount))}
                          ৳
                        </span>
                      </p>
                    </div>
                    <div className="text-center text-sm py-6">
                      <p className="text-lg ">Delivery Date</p>
                      <div className="flex items-center gap-4 justify-center text-gray-500">
                        <span>{order.deliveryDateFrom}</span> <span>to</span>
                        <span>{order.deliveryDateTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 mt-2 border-b pb-2 divide-x">
                  <div className="">
                    <p className="text-lg font-medium">Package Facilites</p>
                    <div className="text-sm max-h-[150px] overflow-y-auto">
                      {order.selectedPackage?.features?.length > 0 ? (
                        <div className="flex flex-wrap gap-x-4 mt-2 pr-4">
                          {order.selectedPackage?.features.map(
                            (item, index) =>
                              item.isAvailable && (
                                <span>
                                  {item.title}{" "}
                                  {index <
                                    order.selectedPackage?.features?.length -
                                      1 && ", "}
                                </span>
                              )
                          )}
                        </div>
                      ) : (
                        <p>No extra facilites</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-center text-sm border-b pb-6 pt-4">
                      <p className="text-lg font-medium">Payment Status</p>
                      <p className="text-gray-500 capitalize">
                        {formatPaymentStatus()}
                      </p>
                    </div>
                    <div className="text-center text-sm py-6">
                      <p className="text-lg font-medium">Service Status</p>
                      {formatOrderStatus()}
                      {order.paymentStatus === "DUE" &&
                        order.status === "ACCEPTED" && (
                          <p className="text-[14px] text-center text-[#7566FF]">
                            Payment pending
                          </p>
                        )}
                    </div>
                    {order.proofImage && (
                      <div className="text-center text-sm pt-2 border-t">
                        <p className="text-lg font-medium">
                          Seller Attachment For You
                        </p>
                        <a
                          download
                          target="_blank"
                          href={order.proofImage}
                          className="flex items-center gap-2 justify-center text-primary"
                        >
                          <AiOutlineFileImage className="text-2xl" />
                          <span>Image.{getUrlExtension(order.proofImage)}</span>
                        </a>
                        <p>{order.proofText}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="py-8 border-b border-[#ececec]">
            <p className="text-center text-lg font-medium mb-2">Instruction</p>
            {order.description ? (
              <p className="text-sm mb-4">{order.description}</p>
            ) : (
              <p className="text-center text-gray-400 mb-4">N/A</p>
            )}
            {order.attachment && (
              <div className="flex justify-center items-center">
                <a
                  className="link link-primary gap-2 flex items-center "
                  download
                  href={order.attachment}
                  target="_blank"
                >
                  <FiFileText /> View Attachment
                </a>
              </div>
            )}
          </div>
          {order.requestedDeliveryDate && (
            <div className="mt-4 p-4 shadow-sm border border-[#ececec] w-full flex flex-col justify-center items-center">
              <p>* Seller Request for Extended Delivery Time</p>
              <p>Request date : {order.requestedDeliveryDate}</p>
            </div>
          )}
        </div>
        <div className="pt-8 pb-4 flex gap-4 justify-end">
          <>
            {order.status === "ACCEPTED" && (
              <button
                onClick={() => makePaymentFn()}
                className={`btn btn-primary capitalize font-medium ${
                  isLoading && "loading"
                }`}
              >
                Pay Now
              </button>
            )}

            {order.refundRequestByUser &&
              order.status !== "REFUNDED" &&
              order.status !== "COMPLETED" && (
                <span>You request for refund</span>
              )}

            {order.status === "CANCELLED" && (
              <p className="text-red-500 font-medium">{cancelStatus()}</p>
            )}
            {order.status === "REFUNDED" && (
              <p className="text-primary font-medium">Order Refunded</p>
            )}
            {order.status === "COMPLETED" && (
              <div className="text-right">
                {!order.review && (
                  <>
                    <p className="text-green-500 font-medium">
                      Order Completed
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={refundOrderFn}
            className={`btn btn-error ${isLoading && "loading"}`}
          >
            Cancel And Refund Order
          </button>
        </div>
      </div>

      {order.review && (
        <div className="pb-6">{/* <ViewReview review={order.review} /> */}</div>
      )}
    </>
  );
};

export default OrderDetailsPackage;
