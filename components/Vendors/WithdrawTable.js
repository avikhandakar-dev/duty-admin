import LoadingScreen from "@components/LoadingScreen";
import {
  cancelWithdraw,
  completeWithdraw,
  getAllWithdrawRequestByServiceId,
} from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const WithdrawTable = ({ type }) => {
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
      const { data } = await getAllWithdrawRequestByServiceId(dashboard, type);
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
  }, [dashboard, doRefresh]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (withdraws.length === 0) {
    return <div>No data found</div>;
  }

  return <div></div>;
};

export default WithdrawTable;
