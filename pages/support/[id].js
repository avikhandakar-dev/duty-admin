import LoadingScreen from "@components/LoadingScreen";
import UserInfo from "@components/Orders/UserInfo";
import SupportDetails from "@components/Support/SupportDetails";
import { getSupportById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SupportDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [supportDetails, setSupportDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const { data } = await getSupportById(id);
      setSupportDetails(data.support);
      console.log(data.support);
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
          <SupportDetails support={supportDetails} />
        </div>
        <div className="w-96 flex-shrink-0">
          <UserInfo user={supportDetails.user} title="User" />
        </div>
      </div>
    </div>
  );
};

export default SupportDetailsPage;
