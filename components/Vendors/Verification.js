import LoadingScreen from "@components/LoadingScreen";
import { getVerificationByServiceId } from "@lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VerificationDetails from "@components/Verification/VerificationDetails";
import IdentityFiles from "@components/Verification/IdentityFiles";
import AddressFiles from "@components/Verification/AddressFiles";
import RejectVerificationCard from "@components/Verification/Reject";
import AcceptVerification from "@components/Verification/Accept";

const Verification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard } = router.query;
  const [verificationData, setVerificationData] = useState(null);
  const [doRefresh, setDoRefresh] = useState(false);

  const getData = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getVerificationByServiceId(dashboard);
      setVerificationData(data.verification);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [dashboard, doRefresh]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (!verificationData) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <VerificationDetails verification={verificationData} />
      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <IdentityFiles images={verificationData.identityFiles} />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <AddressFiles images={verificationData.addressFiles} />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <AcceptVerification
            onSuccess={() => setDoRefresh(!doRefresh)}
            verificationDetails={verificationData}
          />
        </div>
        <div className="flex-1">
          <RejectVerificationCard
            onSuccess={() => setDoRefresh(!doRefresh)}
            verificationDetails={verificationData}
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;
