import AccountInfo from "@components/Customers/AccountInfo";
import Aggregation from "@components/Customers/Aggregation";
import LoadingScreen from "@components/LoadingScreen";
import UserInfo from "@components/Orders/UserInfo";
import { getCustomerById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomerDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const { data } = await getCustomerById(id);
      setCustomerDetails(data.user);
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
          <UserInfo user={customerDetails} title="Customer" />
        </div>
        <div className="flex-1">
          <Aggregation data={customerDetails._count} />
        </div>
      </div>
      <div className="mt-8">
        <AccountInfo customerId={id} />
      </div>
      {/* <pre className="mt-96">{JSON.stringify(customerDetails, null, 4)}</pre>; */}
    </div>
  );
};

CustomerDetailsPage.title = "Customer Details";
export default CustomerDetailsPage;
