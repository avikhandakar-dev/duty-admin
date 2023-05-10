import { sendSupportMessageFromDutySupport } from "@lib/api";
import { SocketContext } from "@lib/socketContext";
import moment from "moment";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const UserInfoSupport = ({ user, title, supportId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const { socket } = useContext(SocketContext);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await sendSupportMessageFromDutySupport({
        text,
        receiverId: user.id,
        supportId,
      });
      socket?.emit("sendMessage", {
        senderId: null,
        receiverId: user.id,
        message: data.message,
      });
      toast.success("Successfully sent message!");
      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-primary rounded">
      <div className="px-4 py-3 bg-primary text-primary-content card-title">
        {title}
      </div>
      <div className="card-body">
        <div className="flex gap-4 items-center pb-2 border-b border-slate-800">
          {user.profilePhoto ? (
            <div className="avatar">
              <div className="w-16 mask mask-hexagon">
                <img src={user.profilePhoto} />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="mask mask-hexagon w-16 h-16 bg-neutral-focus text-neutral-content">
                <span className="text-xl uppercase">{`${user.name.slice(
                  0,
                  1
                )}`}</span>
              </div>
            </div>
          )}
          <div>
            <p className="font-semibold">{`${user.name}`}</p>
            <p className="opacity-50">{user.email}</p>
          </div>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Username</span>
          <span className=" opacity-50">{user.username}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Age</span>
          <span className=" opacity-50">{user.age}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Gender</span>
          <span className=" opacity-50">{user.gender}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Verified</span>
          <input
            type="checkbox"
            className="toggle toggle-primary pointer-events-none"
            defaultChecked={user.verified}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Join Date</span>
          <span className=" opacity-50">
            {moment(user.createdAt).format("Do MMMM, h:mm A")}
          </span>
        </div>
        <form onSubmit={sendMessage} className="mt-4 space-y-4">
          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block textarea textarea-bordered w-full"
            type="text"
          />
          <button
            type="submit"
            className={`btn btn-primary ${isLoading && "loading"}`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoSupport;
