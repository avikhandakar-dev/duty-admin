import LoadingScreen from "@components/LoadingScreen";
import { getCustomerAccount } from "@lib/api";
import { useEffect, useState } from "react";

const AccountInfo = ({ customerId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await getCustomerAccount(customerId);
      setAccountDetails(data.account);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }
  if (!accountDetails) {
    return (
      <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-max border border-success rounded">
        <div className="px-4 py-3 bg-success text-success-content card-title">
          Account Info
        </div>
        <div className="card-body py-16 text-center">
          Account details not found
        </div>
      </div>
    );
  }
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-max border border-success rounded">
      <div className="px-4 py-3 bg-success text-success-content card-title">
        Account Info
      </div>
      <div className="card-body">
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Balance</span>
          <span className=" opacity-50">{accountDetails.balance}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
