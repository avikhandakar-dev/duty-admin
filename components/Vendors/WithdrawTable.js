import LoadingScreen from "@components/LoadingScreen";
import {
  cancelWithdraw,
  completeWithdraw,
  getAllWithdrawRequestByServiceId,
} from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import {
  BsCheckLg,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import moment from "moment";
import { MdClose } from "react-icons/md";

const WithdrawTable = ({ status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard } = router.query;
  const [doRefresh, setDoRefresh] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [withdraws, setWithdraws] = useState([]);

  const getData = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getAllWithdrawRequestByServiceId(
        dashboard,
        status
      );
      setWithdraws(data.withdraws);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  const handelComplete = async (id) => {
    const userAction = confirm(
      `Are you sure you want to complete this withdraw?`
    );
    if (userAction) {
      const Request = async () => {
        try {
          await completeWithdraw(id);
          setDoRefresh(!doRefresh);
          return "Successfully done!";
        } catch (error) {
          console.log(error);
          throw new Error(error.response?.data?.msg);
        }
      };
      toast.promise(Request(), {
        loading: <b>Please wait...</b>,
        success: (data) => <b>{data}</b>,
        error: (err) => <b>{err.toString()}</b>,
      });
    }
  };

  const handelCancel = async (id) => {
    const userAction = confirm(
      `Are you sure you want to cancel this withdraw?`
    );
    if (userAction) {
      const Request = async () => {
        try {
          await cancelWithdraw(id);
          setDoRefresh(!doRefresh);
          return "Successfully done!";
        } catch (error) {
          console.log(error);
          throw new Error(error.response?.data?.msg);
        }
      };
      toast.promise(Request(), {
        loading: <b>Please wait...</b>,
        success: (data) => <b>{data}</b>,
        error: (err) => <b>{err.toString()}</b>,
      });
    }
  };

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Coped to clipboard");
  };

  useEffect(() => {
    getData();
  }, [dashboard, doRefresh, status]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (withdraws.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Bank Name</th>
            <th>Branch Name</th>
            <th>Account Number</th>
            <th>Account Holder Name</th>
            <th>Relation</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {withdraws.map((withdraw) => (
            <tr>
              <td>
                <div className="flex gap-1 items-center cursor-pointer">
                  {withdraw.amount}{" "}
                  <AiOutlineCopy
                    onClick={() => copyToClipboard(withdraw.amount)}
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1 items-center cursor-pointer">
                  {withdraw.service?.account?.bankDetails?.bankName}{" "}
                  <AiOutlineCopy
                    onClick={() =>
                      copyToClipboard(
                        withdraw.service?.account?.bankDetails?.bankName
                      )
                    }
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1 items-center cursor-pointer">
                  {withdraw.service?.account?.bankDetails?.branchName}{" "}
                  <AiOutlineCopy
                    onClick={() =>
                      copyToClipboard(
                        withdraw.service?.account?.bankDetails?.branchName
                      )
                    }
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1 items-center cursor-pointer">
                  {withdraw.service?.account?.bankDetails?.accountNumber}{" "}
                  <AiOutlineCopy
                    onClick={() =>
                      copyToClipboard(
                        withdraw.service?.account?.bankDetails?.accountNumber
                      )
                    }
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1 items-center cursor-pointer">
                  {withdraw.service?.account?.bankDetails?.accountHolderName}{" "}
                  <AiOutlineCopy
                    onClick={() =>
                      copyToClipboard(
                        withdraw.service?.account?.bankDetails
                          ?.accountHolderName
                      )
                    }
                  />
                </div>
              </td>
              <td>{withdraw.service?.account?.bankDetails?.relation}</td>
              <td>
                {moment(withdraw?.createdAt).format("dddd Do MMMM, h:mm A")}
              </td>
              <td>
                {withdraw.status === "PENDING" && (
                  <div className="btn-group">
                    <button
                      onClick={() => handelComplete(withdraw.id)}
                      className="btn btn-success"
                    >
                      <BsCheckLg />
                    </button>
                    <button
                      onClick={() => handelCancel(withdraw.id)}
                      className="btn btn-error"
                    >
                      <MdClose />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Amount</th>
            <th>Bank Name</th>
            <th>Branch Name</th>
            <th>Account Number</th>
            <th>Account Holder Name</th>
            <th>Relation</th>
            <th>Date</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WithdrawTable;
