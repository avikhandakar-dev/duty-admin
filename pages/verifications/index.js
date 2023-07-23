import LoadingScreen from "@components/LoadingScreen";
import { getAllVerifications } from "@lib/api";
import debounce from "lodash.debounce";
import moment from "moment";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const VerificationsPage = () => {
  const [verifications, setVerifications] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [verified, setVerified] = useState(0);
  const [notVerified, setNotVerified] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("verified");

  const Filters = [
    {
      name: "Verified",
      value: "verified",
      display: verified,
    },
    {
      name: "Not Verified",
      value: "not-verified",
      display: notVerified,
    },
  ];

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  const fetchData = async () => {
    try {
      setIsFiltering(true);
      const { data } = await getAllVerifications(
        limit,
        skip,
        searchTerm,
        selectedFilter
      );
      setVerifications(data.verifications);
      setTotal(data.total);
      setVerified(data.verified);
      setNotVerified(data.notVerified);
    } catch (error) {
      setVerifications([]);
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFiltering(false);
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  useEffect(() => {
    fetchData();
  }, [skip, searchTerm, selectedFilter]);

  return (
    <>
      <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
        <div className="flex flex-wrap mb-2">
          {Filters.map((filter, i) => (
            <label className="label cursor-pointer gap-1">
              <input
                className="radio radio-sm radio-primary"
                type="radio"
                value={filter.value}
                checked={selectedFilter === filter.value}
                onChange={() => setSelectedFilter(filter.value)}
              />
              <span className="label-text">
                {filter.name} ({filter.display})
              </span>
            </label>
          ))}
        </div>
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
          {verifications.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Accepted</th>
                  <th>Rejected</th>
                  <th>Submited</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {verifications.map((verification) => (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3 max-w-xs overflow-x-hidden">
                        {verification.service.user.profilePhoto ? (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={verification.service.user.profilePhoto}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                              <span className="text-xl uppercase">{`${verification.service.user.name.slice(
                                0,
                                1
                              )}`}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="font-bold line-clamp-1">{`${verification.service.serviceCenterName}`}</div>
                          <div className="text-sm opacity-50">
                            {verification.service.user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary pointer-events-none"
                        defaultChecked={verification.accept}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary pointer-events-none"
                        defaultChecked={verification.reject}
                      />
                    </td>
                    <td>
                      {moment(verification?.createdAt).format(
                        "Do MMMM, h:mm A"
                      )}
                    </td>
                    <td>
                      <Link href={`/verifications/${verification.id}`}>
                        <a className="btn btn-ghost btn-xs">details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>User</th>
                  <th>Accepted</th>
                  <th>Rejected</th>
                  <th>Submited</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-8">No data found</div>
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

VerificationsPage.title = "Verifications";
export default VerificationsPage;
