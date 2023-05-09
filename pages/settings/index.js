import { getDutyFee } from "@lib/api";
import { useEffect, useState } from "react";
const SettingsPage = () => {
  const [dutyFee, setDutyFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDutyFee();
        setDutyFee(data.fee);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p className="text-5xl font-bold">Duty Fee : {dutyFee * 100}%</p>
    </div>
  );
};

export default SettingsPage;
