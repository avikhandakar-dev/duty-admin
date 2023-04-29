import LoadingScreen from "@components/LoadingScreen";
import UserInfo from "@components/Orders/UserInfo";
import AcceptVerification from "@components/Verification/Accept";
import AddressFiles from "@components/Verification/AddressFiles";
import FaceWithoutSmile from "@components/Verification/FaceWithoutSmile";
import FaceWithSmile from "@components/Verification/FaceWithSmile";
import IdentityFiles from "@components/Verification/IdentityFiles";
import RejectVerificationCard from "@components/Verification/Reject";
import VerificationDetails from "@components/Verification/VerificationDetails";
import { getVerificationById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerificationDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [doRefresh, setDoRefresh] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const { data } = await getVerificationById(id);
      setVerificationDetails(data.verification);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, doRefresh]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex gap-8">
        <div className="flex-1">
          <VerificationDetails verification={verificationDetails} />
        </div>
        <div className="w-96 flex-shrink-0">
          <UserInfo user={verificationDetails.service.user} title="Vendor" />
        </div>
      </div>

      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <IdentityFiles images={verificationDetails.identityFiles} />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <AddressFiles images={verificationDetails.addressFiles} />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <AcceptVerification
            onSuccess={() => setDoRefresh(!doRefresh)}
            verificationDetails={verificationDetails}
          />
        </div>
        <div className="flex-1">
          <RejectVerificationCard
            onSuccess={() => setDoRefresh(!doRefresh)}
            verificationDetails={verificationDetails}
          />
        </div>
      </div>
      {/* <pre className="mt-96">
        {JSON.stringify(verificationDetails, null, 4)}
      </pre> */}
    </div>
  );
};

VerificationDetailsPage.title = "Vendor Details";
export default VerificationDetailsPage;
