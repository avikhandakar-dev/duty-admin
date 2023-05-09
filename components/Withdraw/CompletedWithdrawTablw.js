import LoadingScreen from "@components/LoadingScreen";
import { getAllCompletedWithdrawRequest } from "@lib/api";
import debounce from "lodash.debounce";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const CompletedWithdrawTable = () => {
  const [withdraws, setPendingWithdraws] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doRefresh, setDoRefresh] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  const fetchData = async () => {
    try {
      setIsFiltering(true);
      const { data } = await getAllCompletedWithdrawRequest(
        limit,
        skip,
        searchTerm
      );
      setPendingWithdraws(data.withdraws);
      setTotal(data.total);
    } catch (error) {
      setPendingWithdraws([]);
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFiltering(false);
    }
  };

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Coped to clipboard");
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  useEffect(() => {
    fetchData();
  }, [skip, searchTerm, doRefresh]);

  return (
    <>
      <div className="flex justify-between items-end mb-4 gap-4 flex-col md:flex-row">
        <div></div>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              onChange={debouncedResults}
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <div className="overflow-x-auto w-full border rounded-lg border-base-200 relative">
          {isFiltering && (
            <span className="absolute inset-0 w-full h-full bg-base-200 bg-opacity-0 z-[15] backdrop-blur-sm" />
          )}
          {withdraws.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Bank Name</th>
                  <th>Branch Name</th>
                  <th>Account Number</th>
                  <th>Account Holder Name</th>
                  <th>Relation</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {withdraws.map((withdraw) => (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3 max-w-xs overflow-x-hidden">
                        {withdraw.service.user.profilePhoto ? (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={withdraw.service.user.profilePhoto}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                              <span className="text-xl uppercase">{`${withdraw.service.user.name.slice(
                                0,
                                1
                              )}`}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="font-bold line-clamp-1">{`${withdraw.service.user.name}`}</div>
                          <div className="text-sm opacity-50">
                            {withdraw.service.user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{withdraw.service.serviceCenterName}</td>
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
                              withdraw.service?.account?.bankDetails
                                ?.accountNumber
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center cursor-pointer">
                        {
                          withdraw.service?.account?.bankDetails
                            ?.accountHolderName
                        }{" "}
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
                      {moment(withdraw?.updatedAt).format(
                        "dddd Do MMMM, h:mm A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Vendor</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Bank Name</th>
                  <th>Branch Name</th>
                  <th>Account Number</th>
                  <th>Account Holder Name</th>
                  <th>Relation</th>
                  <th>Date</th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-8">No withdraws found</div>
          )}
        </div>
      )}
      <div className="pb-4 flex justify-center items-center mt-4">
        <ReactPaginate
          breakLabel="..."
          breakClassName="btn btn-disabled px-6 relative"
          breakLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          nextLabel={<BsChevronDoubleRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(total / limit)}
          previousLabel={<BsChevronDoubleLeft />}
          renderOnZeroPageCount={null}
          pageClassName="btn relative px-6"
          pageLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          previousClassName="btn relative px-6"
          previousLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          nextClassName="btn relative px-6"
          nextLinkClassName="w-full h-full absolute inset-0 flex justify-center items-center"
          containerClassName="btn-group flex-wrap gap-y-2 justify-center"
          activeClassName="btn relative px-6 btn-active"
        />
      </div>
    </>
  );
};

export default CompletedWithdrawTable;
