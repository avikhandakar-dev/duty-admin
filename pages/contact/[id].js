import LoadingScreen from "@components/LoadingScreen";
import ContactDetails from "@components/Support/ContactDetails";
import SupportDetails from "@components/Support/SupportDetails";
import { getContactById } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ContactDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [supportDetails, setContactDetails] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const { data } = await getContactById(id);
      setContactDetails(data.contact);
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
          <ContactDetails contact={supportDetails} />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
