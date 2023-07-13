import LoadingScreen from "@components/LoadingScreen";
import { getOrdersByServiceId } from "@lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatStatus } from "@lib/utils";
import ReactPaginate from "react-paginate";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import OrderDetailsModal from "./OrderDetailsModal";

const FixedOrderVendor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();
  const { dashboard } = router.query;
  const [orders, setOrders] = useState([]);
  const [doRefresh, setDoRefresh] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

  const getData = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getOrdersByServiceId(dashboard, "ONETIME");
      setOrders(data.orders);
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
    getData();
  }, [dashboard, doRefresh]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (orders.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <>
      <div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Order ID</th>
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
                <td>{formatStatus(order.status)}</td>
                <th>
                  <a
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </a>
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
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={selectedOrder ? true : false}
          closeModal={() => {
            setSelectedOrder(null);
          }}
        />
      )}
    </>
  );
};

export default FixedOrderVendor;
