import { acceptVerification } from "@lib/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AcceptVerificationCard = ({ verificationDetails, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const acceptVerificationFn = async () => {
    try {
      setIsLoading(true);
      await acceptVerification({
        verificationId: verificationDetails.id,
      });
      toast.success("Successfully accepted verification!");
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-success rounded">
      <div className="px-4 py-3 bg-success text-success-content card-title">
        Accept
      </div>
      <div className="card-body">
        <div className="w-full h-48 flex justify-center items-center">
          <button
            onClick={acceptVerificationFn}
            className={`btn btn-success btn-wide ${isLoading && "loading"}`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptVerificationCard;
