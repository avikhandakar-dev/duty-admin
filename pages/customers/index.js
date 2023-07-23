import LoadingScreen from "@components/LoadingScreen";
import { getAllCustomers } from "@lib/api";
import { SocketContext } from "@lib/socketContext";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Tab } from "@headlessui/react";
import OrdersCustomer from "@components/Customers/OrdersCustomer";
import Supports from "@components/Customers/Supports";
import ChatUser from "@components/Customers/Chat";
import NoteModalUser from "@components/Customers/NoteModalUser";
import { FaFacebookMessenger } from "react-icons/fa";
import MessageModal from "@components/Vendors/MessageModal";

const Filters = [
  {
    name: "All",
    value: "",
  },
  {
    name: "T",
    value: "Today",
  },
  {
    name: "W",
    value: "ThisWeek",
  },
  {
    name: "M",
    value: "ThisMonth",
  },
  {
    name: "Y",
    value: "ThisYear",
  },
];

const CustomersPage = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { onlineUsers } = useContext(SocketContext);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    // {
    //   name: "About",
    //   content: <AboutVendor />,
    // },
    {
      name: "Orders",
      content: <OrdersCustomer />,
    },
    {
      name: "Support",
      content: <Supports />,
    },
    {
      name: "Chatting",
      content: <ChatUser />,
    },
    // {
    //   name: "Appo",
    //   content: <></>,
    // },
    // {
    //   name: "Notification",
    //   content: <></>,
    // },
  ];

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  const fetchData = async (merge = false) => {
    try {
      setIsFiltering(true);
      const { data } = await getAllCustomers(
        limit,
        skip,
        searchTerm,
        selectedFilter
      );
      if (merge) {
        setUsers((prev) => [...prev, ...data.users]);
      } else {
        setUsers(data.users);
      }
      setTotal(data.total);
      if (data.users.length < limit) {
        setIsEnd(true);
      }
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
    fetchData(true);
  }, [skip]);

  useEffect(() => {
    fetchData(false);
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    if (users.length > 0) {
      if (!selectedVendor) {
        setSelectedVendor(users[0]);
      }
    }
  }, [users]);

  useEffect(() => {
    if (selectedVendor) {
      router.push({
        query: {
          ...router.query,
          id: selectedVendor.id,
        },
      });
    }
  }, [selectedVendor]);

  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);

  return (
    <>
      <div className="flex">
        <div className="w-72 flex-shrink-0 border-r border-gray-600 h-screen overflow-y-auto">
          <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
            <div className="form-control">
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
                    <span className="label-text">{filter.name}</span>
                  </label>
                ))}
              </div>
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
                      }}
                      className={`flex gap-4 items-center pr-4 cursor-pointer ${
                        user.id === selectedVendor?.id
                          ? "bg-gray-600 rounded-md"
                          : ""
                      }`}
                    >
                      <div className="flex flex-1 items-center space-x-3 max-w-xs overflow-x-hidden">
                        {user.profilePhoto ? (
                          <div
                            className={`avatar ${
                              onlineUsers.find((d) => d.id === user.id)
                                ? "online"
                                : "offline"
                            }`}
                          >
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={user.profilePhoto} alt="Avatar" />
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`avatar placeholder ${
                              onlineUsers.find((d) => d.id === user.id)
                                ? "online"
                                : "offline"
                            }`}
                          >
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">No vendor found</div>
              )}
            </div>
          )}
          {!isEnd && (
            <div className="pb-4 flex justify-center items-center mt-4">
              <button
                onClick={() => setSkip(skip + limit)}
                className={`btn btn-success btn-sm btn-block btn-outline ${
                  isFiltering && "loading"
                }`}
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 h-auto bg-gray-800 rounded-md">
          <div>
            <div className="flex gap-4 items-center">
              <a className="btn rounded">No seller profile</a>
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-sm capitalize btn-primary rounded"
              >
                Note
              </button>
              <button
                onClick={() => setShowMessage(true)}
                className="btn btn-sm capitalize btn-secondary rounded"
              >
                <FaFacebookMessenger />
              </button>
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
      {isOpen && (
        <NoteModalUser
          isOpen={isOpen}
          closeModal={() => {
            setIsOpen(false);
          }}
        />
      )}
      {showMessage && (
        <MessageModal
          isOpen={showMessage}
          closeModal={() => {
            setShowMessage(false);
          }}
          isVendor={false}
        />
      )}
    </>
  );
};

CustomersPage.title = "Customers";
export default CustomersPage;
