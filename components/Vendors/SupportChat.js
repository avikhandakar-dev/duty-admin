import LoadingScreen from "@components/LoadingScreen";
import { getSupportByServiceId } from "@lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import SupportView from "./SupportView";

const SupportsChat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard } = router.query;
  const [supports, setSupports] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

  const getSupports = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getSupportByServiceId(dashboard, limit, skip);
      setSupports(data.supports);
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

  useEffect(() => {
    getSupports();
  }, [dashboard, skip]);

  useEffect(() => {
    return () => {
      setSelectedSupport(null);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (supports?.length === 0) {
    return <div>No data found</div>;
  }

  if (selectedSupport) {
    return (
      <SupportView
        support={selectedSupport}
        goBack={() => setSelectedSupport(null)}
      />
    );
  }

  return (
    <>
      <div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Replied</th>
              <th>Subject</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {supports.map((support) => (
              <tr>
                <td>{support.ticketNumber}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary pointer-events-none"
                    defaultChecked={support.isReplied}
                  />
                </td>
                <td>{support.subject}</td>
                <td>{moment(support?.createdAt).format("Do MMMM, h:mm A")}</td>
                <td>
                  <a
                    onClick={() => setSelectedSupport(support)}
                    className="btn btn-ghost btn-xs"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Ticket</th>
              <th>Replied</th>
              <th>Subject</th>
              <th>Date</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pb-4 flex justify-center items-center mt-4">
        <ReactPaginate
          breakLabel="..."
          breakClassName="btn btn-sm btn-disabled px-4 relative"
          breakLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          nextLabel={<BsChevronDoubleRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(total / limit)}
          previousLabel={<BsChevronDoubleLeft />}
          renderOnZeroPageCount={null}
          pageClassName="btn btn-sm relative px-4"
          pageLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          previousClassName="btn btn-sm relative px-4"
          previousLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          nextClassName="btn btn-sm relative px-4"
          nextLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          containerClassName="btn-group flex-wrap gap-y-2 justify-center"
          activeClassName="btn btn-sm relative px-4 btn-active"
        />
      </div>
    </>
  );
};

export default SupportsChat;
