import LoadingScreen from "@components/LoadingScreen";
import {
  togglePopular,
  toggleTop,
  toggleTrending,
  toggleSuggest,
  getStartingGigs,
} from "@lib/api";
import debounce from "lodash.debounce";
import moment from "moment";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  BsCheckLg,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import ReactPaginate from "react-paginate";

const StartingServices = ({ refreash }) => {
  const [gigs, setGigs] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);
  const [thisYear, setThisYear] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doRefresh, setDoRefresh] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const Filters = [
    {
      name: "All",
      value: "",
      display: total,
    },
    {
      name: "Today",
      value: "Today",
      display: today,
    },
    {
      name: "Week",
      value: "ThisWeek",
      display: thisWeek,
    },
    {
      name: "Month",
      value: "ThisMonth",
      display: thisMonth,
    },
    {
      name: "Year",
      value: "ThisYear",
      display: thisYear,
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
      const { data } = await getStartingGigs(
        limit,
        skip,
        searchTerm,
        selectedFilter
      );
      setGigs(data.gigs);
      setTotal(data.total);
      setThisMonth(data.thisMonth);
      setThisWeek(data.thisWeek);
      setThisYear(data.thisYear);
      setToday(data.today);
    } catch (error) {
      setGigs([]);
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFiltering(false);
    }
  };

  const togglePopularFn = async (id) => {
    const Request = async () => {
      try {
        await togglePopular(id);
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
  };

  const toggleTopFn = async (id) => {
    const Request = async () => {
      try {
        await toggleTop(id);
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
  };

  const toggleTrendingFn = async (id) => {
    const Request = async () => {
      try {
        await toggleTrending(id);
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
  };

  const toggleSuggestFn = async (id) => {
    const Request = async () => {
      try {
        await toggleSuggest(id);
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
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  useEffect(() => {
    fetchData();
  }, [skip, searchTerm, doRefresh, selectedFilter, refreash]);

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
          {gigs.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th>Popular</th>
                  <th>Top</th>
                  <th>Trending</th>
                  <th>Suggest</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {gigs.map((gig) => (
                  <tr>
                    <td>
                      <Link href={`/vendors/${gig.service.user.id}`}>
                        <div className="flex cursor-pointer items-center space-x-3 max-w-xs overflow-x-hidden">
                          {gig.service.user.profilePhoto ? (
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={gig.service.user.profilePhoto}
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="avatar placeholder">
                              <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                                <span className="text-xl uppercase">{`${gig.service.user.name.slice(
                                  0,
                                  1
                                )}`}</span>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="font-bold line-clamp-1">{`${gig.service.user.name}`}</div>
                            <div className="text-sm opacity-50">
                              {gig.service.user.phone}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>{gig.type}</td>
                    <td className="max-w-xs whitespace-normal">{gig.title}</td>
                    <td>{gig.price}</td>
                    <td>{moment(gig?.createdAt).format("Do MMMM, h:mm A")}</td>
                    <td>
                      {gig.type === "STARTING" ? (
                        <input
                          onChange={() => togglePopularFn(gig.id)}
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={gig.popular}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {gig.type === "STARTING" ? (
                        <input
                          onChange={() => toggleTopFn(gig.id)}
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={gig.top}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {gig.type === "STARTING" ? (
                        <input
                          onChange={() => toggleTrendingFn(gig.id)}
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={gig.trending}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {gig.type === "STARTING" ? (
                        <input
                          onChange={() => toggleSuggestFn(gig.id)}
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={gig.suggest}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Vendor</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th>Popular</th>
                  <th>Top</th>
                  <th>Trending</th>
                  <th>Suggest</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-8">No services found</div>
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

export default StartingServices;
