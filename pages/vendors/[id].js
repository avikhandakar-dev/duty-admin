import LoadingScreen from "@components/LoadingScreen";
import UserInfo from "@components/Orders/UserInfo";
import AccountInfo from "@components/Vendors/AccountInfo";
import Aggregation from "@components/Vendors/Aggregation";
import ProviderInfo from "@components/Vendors/ProviderInfo";
import ServiceDetails from "@components/Vendors/ServiceDetails";
import { getVendorById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VendorDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [vendorDetails, setVendorDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const { data } = await getVendorById(id);
      setVendorDetails(data.user);
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
          <UserInfo user={vendorDetails} title="Vendor" />
        </div>
        <div className="flex-1">
          <Aggregation data={vendorDetails._count} />
        </div>
      </div>
      {vendorDetails.services.map((service) => (
        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <ServiceDetails service={service} />
          </div>
          <div className="w-96 flex-shrink-0 space-y-8">
            <AccountInfo serviceId={service.id} />
            <ProviderInfo provider={service.providerInfo} />
          </div>
        </div>
      ))}
      {/* <pre className="mt-96">{JSON.stringify(vendorDetails, null, 4)}</pre>; */}
    </div>
  );
};

VendorDetailsPage.title = "Vendor Details";
export default VendorDetailsPage;
