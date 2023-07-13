import LoadingScreen from "@components/LoadingScreen";
import { getAllVendors } from "@lib/api";
import { SocketContext } from "@lib/socketContext";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Tab } from "@headlessui/react";
import AboutVendor from "@components/Vendors/AboutVendor";
import Services from "@components/Vendors/Services";
import SupportsVendor from "@components/Vendors/Supports";
import ChatVendor from "@components/Vendors/ChatVendor";
import ServiceOptionsMenu from "@components/Vendors/ServiceOptionsMenu";
import Verification from "@components/Vendors/Verification";
import OrdersVendor from "@components/Vendors/Orders";
import WithdrawPage from "@components/Vendors/Withdraw";

const VendorsPage = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { onlineUsers } = useContext(SocketContext);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    {
      name: "About",
      content: <AboutVendor />,
    },
    {
      name: "Service",
      content: <Services />,
    },
    {
      name: "Orders",
      content: <OrdersVendor />,
    },
    {
      name: "Withdraw",
      // content: <WithdrawPage />,
      content: <></>,
    },
    {
      name: "Support",
      content: <SupportsVendor />,
    },
    {
      name: "Chatting",
      content: <ChatVendor />,
    },
    {
      name: "Appo",
      content: <></>,
    },
    {
      name: "Verification",
      content: <Verification />,
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
      const { data } = await getAllVendors(limit, skip, searchTerm);
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      setUsers([]);
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
  }, [skip, searchTerm]);

  useEffect(() => {
    if (users.length > 0) {
      if (!selectedVendor) {
        setSelectedVendor(users[0]);
        setDashboards(users[0].services);
      }
    }
  }, [users]);

  useEffect(() => {
    if (selectedVendor) {
      router.push({
        query: {
          ...router.query,
          id: selectedVendor.id,
          dashboard: selectedVendor?.services[0].id,
        },
      });
      setDashboardData(selectedVendor?.services[0]);
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (selectedDashboard) {
      router.push({
        query: {
          ...router.query,
          dashboard: selectedDashboard,
        },
      });
      setDashboardData(
        selectedVendor?.services.find((item) => item.id === selectedDashboard)
      );
    }
  }, [selectedDashboard]);

  return (
    <>
      <div className="flex">
        <div className="w-72 flex-shrink-0 border-r border-gray-600 h-screen overflow-y-auto">
          <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
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
              {users.length > 0 ? (
                <div className="w-full space-y-4">
                  {users.map((user, index) => (
                    <div
                      onClick={() => {
                        setSelectedVendor(user);
                        setDashboards(user.services);
                      }}
                      className={`flex gap-4 items-center pr-4 cursor-pointer ${
                        user.id === selectedVendor?.id
                          ? "bg-gray-600 rounded-md"
                          : ""
                      }`}
                    >
                      <div className="flex flex-1 items-center space-x-3 max-w-xs overflow-x-hidden">
                        {user.profilePhoto ? (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={user.profilePhoto} alt="Avatar" />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                              <span className="text-xl uppercase">{`${user.name.slice(
                                0,
                                1
                              )}`}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="font-bold line-clamp-1">{`${user.name}`}</div>
                          <div className="text-sm opacity-50">{user.phone}</div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <MdVerified />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">No vendor found</div>
              )}
            </div>
          )}
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
        </div>
        <div className="flex-1 h-auto bg-gray-800 rounded-md">
          <div>
            <div className="flex gap-4 items-center">
              <select
                className="select rounded-none border-gray-200 border-0 border-b select-bordered bg-transparent focus:outline-none"
                onChange={(e) => setSelectedDashboard(e.target.value)}
              >
                {dashboards.map((dashboard, index) => (
                  <option
                    selected={index === 0}
                    value={dashboard.id}
                    key={index}
                  >
                    {dashboard.serviceCenterName}
                  </option>
                ))}
              </select>
              <span>{dashboardData?.accepted ? "Approved" : "Pending"}</span>
              <ServiceOptionsMenu dashboard={dashboardData} />
            </div>
            <Tab.Group>
              <Tab.List className="flex w-max">
                {Tabs.map((item, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      cn(
                        "w-full relative border-b dark:text-white px-4 py-2.5 focus:outline-none whitespace-nowrap",
                        selected
                          ? "text-primary dark:text-primary border-primary"
                          : "hover:text-primary"
                      )
                    }
                  >
                    {index < Tabs.length - 1 && (
                      <span className=" absolute right-0 w-[1px] h-6 top-1/2 -translate-y-1/2 bg-gray-100" />
                    )}
                    <span className="">{item.name}</span>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="p-4">
                {Tabs.map((item, index) => (
                  <Tab.Panel>{item.content}</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

VendorsPage.title = "Vendors";
export default VendorsPage;
