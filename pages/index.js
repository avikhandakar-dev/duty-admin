import LoadingScreen from "@components/LoadingScreen";
import { getAllOrders } from "@lib/api";
import { formatStatus } from "@lib/utils";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/router";

export const OrderStatus = [
  {
    name: "Accepted",
    value: "ACCEPTED",
  },
  {
    name: "Cancelled",
    value: "CANCELLED",
  },
  {
    name: "Completed",
    value: "COMPLETED",
  },
  {
    name: "Delivered",
    value: "DELIVERED",
  },
  {
    name: "Processing",
    value: "PROCESSING",
  },
  {
    name: "Refunded",
    value: "REFUNDED",
  },
  {
    name: "Waiting for accept",
    value: "WAITING_FOR_ACCEPT",
  },
  {
    name: "Waiting for payment",
    value: "WAITING_FOR_PAYMENT",
  },
];

const OrderType = [
  {
    name: "Fixed",
    value: "ONETIME",
  },
  {
    name: "Installment",
    value: "INSTALLMENT",
  },
  {
    name: "Package",
    value: "PACKAGE",
  },
  {
    name: "Starting",
    value: "STARTING",
  },
  {
    name: "Subscription",
    value: "SUBS",
  },
];

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [gte, setGte] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const filterButtons = [
    {
      id: 1,
      title: "All",
      action: () => {
        setSelectedFilter(1);
        setGte("");
        router.push({ query: { ...router.query, gte: null } }, undefined, {
          shallow: true,
        });
      },
    },
    {
      id: 2,
      title: "Today",
      action: () => {
        setSelectedFilter(2);
        setGte(moment().subtract(1, "days"));
      },
    },
    {
      id: 3,
      title: "Last 7 Days",
      action: () => {
        setSelectedFilter(3);
        setGte(moment().subtract(7, "days"));
      },
    },
    {
      id: 4,
      title: "This Month",
      action: () => {
        setSelectedFilter(4);
        setGte(moment().subtract(30, "days"));
      },
    },
  ];

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    router.push({ query: { ...router.query, q: e.target.value } }, undefined, {
      shallow: true,
    });
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  const fetchData = async () => {
    try {
      setIsFiltering(true);
      const { data } = await getAllOrders(
        limit,
        skip,
        gte,
        router.query.q || "",
        type,
        status
      );
      setOrders(data.orders);
      setTotal(data.total);
    } catch (error) {
      setOrders([]);
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
  }, [skip, gte, router, type, status]);

  return (
    <>
      <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
        <div className="btn-group">
          {filterButtons.map((item) => (
            <button
              onClick={item.action}
              className={`btn ${selectedFilter === item.id && "btn-active"}`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="form-control">
          <div className="input-group">
            <div className="dropdown">
              <label tabIndex={0} className="btn rounded-r-none">
                <AiOutlineFilter />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
              >
                <li>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="select w-full max-w-xs"
                  >
                    <option value="" disabled selected>
                      Order Type
                    </option>
                    {OrderType.map((type) => (
                      <option value={type.value}>{type.name}</option>
                    ))}
                  </select>
                </li>
                <li>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="select w-full max-w-xs"
                  >
                    <option value="" disabled selected>
                      Status
                    </option>
                    {OrderStatus.map((status) => (
                      <option value={status.value}>{status.name}</option>
                    ))}
                  </select>
                </li>
                <div className="px-5">
                  <button
                    onClick={() => {
                      setStatus("");
                      setType("");
                    }}
                    className="link link-warning link-hover"
                  >
                    Reset
                  </button>
                </div>
              </ul>
            </div>
            <input
              defaultValue={router.query.q}
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
          {orders.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Service</th>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        {order.user.profilePhoto ? (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={order.user.profilePhoto} alt="Avatar" />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                              <span className="text-xl uppercase">{`${order.user.name.slice(
                                0,
                                1
                              )}`}</span>
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="font-bold">{`${order.user.name}`}</div>
                          <div className="text-sm opacity-50">
                            {order.user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {order.service.serviceCenterName}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {`${order.service.providerInfo?.title} ${order.service.providerInfo?.name}`}
                      </span>
                    </td>
                    <td>
                      <div>{order.id}</div>
                      <div className="text-sm opacity-50">
                        {moment(order?.createdAt).format("Do MMMM, h:mm A")}
                      </div>
                    </td>
                    <td>{order.type}</td>
                    <td>{formatStatus(order.status)}</td>
                    <th>
                      <Link href={`/order/${order.id}`}>
                        <a className="btn btn-ghost btn-xs">details</a>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>User</th>
                  <th>Service</th>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-8">No orders found</div>
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
}
Home.title = "Orders";
