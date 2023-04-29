import { rejectVerification } from "@lib/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const RejectVerificationCard = ({ verificationDetails, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const rejectVerificationFn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await rejectVerification({
        verificationId: verificationDetails.id,
        rejectReason: reason,
      });
      toast.success("Successfully rejected verification!");
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-error rounded">
      <div className="px-4 py-3 bg-error text-error-content card-title">
        Reject
      </div>
      <div className="card-body">
        <form
          onSubmit={rejectVerificationFn}
          className="w-full h-48 flex flex-col justify-center items-center"
        >
          <input
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            type="text"
            className="input input-bordered w-full mb-4"
          />
          <button
            type="submit"
            className={`btn btn-error btn-wide ${isLoading && "loading"}`}
          >
            Reject
          </button>
        </form>
      </div>
    </div>
  );
};

export default RejectVerificationCard;
