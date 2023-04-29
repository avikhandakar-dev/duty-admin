import EditAdminForm from "@components/Forms/EditAdminForm";
import NewAdminForm from "@components/Forms/NewAdminForm";
import LoadingScreen from "@components/LoadingScreen";
import { deleteAdmin, getAllAdmins } from "@lib/api";
import debounce from "lodash.debounce";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [doRefresh, setDoRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  const fetchData = async () => {
    try {
      setIsFiltering(true);
      const { data } = await getAllAdmins(limit, skip, searchTerm);
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

  const handelDelete = async (id) => {
    const userAction = confirm(`Are you sure you want to delete this user?`);
    if (userAction) {
      const Request = async () => {
        try {
          await deleteAdmin(id);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip, searchTerm, doRefresh]);

  return (
    <>
      <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-warning gap-2 btn-wide"
          >
            Add New User <FaPlus />
          </button>
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
          {users.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar placeholder">
                          <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                            <span className="text-xl uppercase">{`${user.name.slice(
                              0,
                              2
                            )}`}</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{`${user.name}`}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone || "N/A"}</td>
                    <td>{user.role}</td>
                    <td>{moment(user?.createdAt).format("Do MMMM, h:mm A")}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="btn btn-warning"
                        >
                          <GrEdit />
                        </button>
                        <button
                          onClick={() => handelDelete(user.id)}
                          className="btn btn-error"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-8">No user found</div>
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
      {isOpen && (
        <NewAdminForm
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          isSuccess={() => setDoRefresh(!doRefresh)}
        />
      )}
      {selectedUser && (
        <EditAdminForm
          isOpen={selectedUser ? true : false}
          closeModal={() => setSelectedUser(null)}
          isSuccess={() => setDoRefresh(!doRefresh)}
          userData={selectedUser}
        />
      )}
    </>
  );
};

AdminPage.title = "Admin";
export default AdminPage;
