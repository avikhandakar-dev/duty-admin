import LoadingScreen from "@components/LoadingScreen";
import Conversation from "@components/Orders/Conversation";
import InstallmentDetails from "@components/Orders/InstallmentDetails";
import InstallmentOrderView from "@components/Orders/InstallmentOrderView";
import ServiceViewer from "@components/Orders/ServiceViewer";
import MoreInfo from "@components/Orders/MoreInfo";
import OrderDetailsCard from "@components/Orders/OrderDetails";
import SubsDetails from "@components/Orders/SubsDetails";
import SubsOrderView from "@components/Orders/SubsOrderView";
import UserInfo from "@components/Orders/UserInfo";
import { getOrderById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const { data } = await getOrderById(id);
      setOrderDetails(data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex gap-8">
        <div className="flex-1">
          <OrderDetailsCard orderDetails={orderDetails} />
        </div>
        <div className="w-96 flex-shrink-0">
          <MoreInfo orderDetails={orderDetails} />
        </div>
      </div>
      {orderDetails.type === "INSTALLMENT" && (
        <div className="flex gap-8 mt-8">
          <div className="w-96 flex-shrink-0">
            <InstallmentDetails
              installmentData={orderDetails.installmentData}
            />
          </div>
          <div className="flex-1">
            <InstallmentOrderView orders={orderDetails.installmentOrders} />
          </div>
        </div>
      )}
      {orderDetails.type === "SUBS" && (
        <div className="flex gap-8 mt-8 w-full">
          <div className="w-96 flex-shrink-0">
            <SubsDetails subsData={orderDetails.subsData} />
          </div>
          <div className="flex-1 overflow-x-auto">
            <SubsOrderView orders={orderDetails.subsOrders} />
          </div>
        </div>
      )}
      <div className="flex gap-8 mt-8 w-full">
        <div className="flex-1">
          <UserInfo user={orderDetails.service.user} title="Vendor" />
        </div>
        <div className="flex-1">
          <UserInfo user={orderDetails.user} title="Customer" />
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <div className="flex-1">
          <Conversation
            vendorId={orderDetails.service.userId}
            customerId={orderDetails.userId}
          />
        </div>
        <div className="flex-1">
          <ServiceViewer
            selectedServices={orderDetails.selectedServices}
            facilites={orderDetails.facilites}
          />
        </div>
      </div>
      {/* <pre className="mt-96">{JSON.stringify(orderDetails, null, 4)}</pre>; */}
    </div>
  );
};

OrderDetails.title = "Order Details";
export default OrderDetails;
