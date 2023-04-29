import { formatStatus } from "@lib/utils";
import moment from "moment";

const SubsOrderView = ({ orders }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-accent rounded">
      <div className="px-4 py-3 bg-accent text-accent-content card-title">
        Subscription
      </div>
      <div className="card-body overflow-x-auto">
        {orders.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Date</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Refund Request By User</th>
                <th>Delivered</th>
                <th>Received</th>
                <th>Delivered At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{moment(order?.createdAt).format("Do MMMM, h:mm A")}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked={order.paid}
                    />
                  </td>
                  <td>{formatStatus(order.status)}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked={order.refundRequestByUser}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked={order.delivered}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked={order.received}
                    />
                  </td>
                  <td>
                    {order.deliveredAt
                      ? moment(order?.deliveredAt).format("Do MMMM, h:mm A")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8">No data found</div>
        )}
      </div>
    </div>
  );
};

export default SubsOrderView;
