import { formatStatus } from "@lib/utils";
import moment from "moment";

const InstallmentOrderView = ({ orders }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-accent rounded">
      <div className="px-4 py-3 bg-accent text-accent-content card-title">
        Installment
      </div>
      <div className="card-body">
        {orders.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Date</th>
                <th>Paid</th>
                <th>Status</th>
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
                      checked={order.paid}
                    />
                  </td>
                  <td>{formatStatus(order.status)}</td>
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

export default InstallmentOrderView;
