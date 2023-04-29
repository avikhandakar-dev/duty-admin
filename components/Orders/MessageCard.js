import moment from "moment";
import Image from "next/image";

const MessageCard = ({ right = false, user, message }) => {
  return (
    <>
      {message.image && (
        <div
          className={`flex items-end justify-end gap-2 ${
            !right && "flex-row-reverse"
          }`}
        >
          <div className={`flex flex-col gap-2 w-full mt-2 max-w-[350px]`}>
            <div
              className={`relative w-full rounded-md cursor-pointer aspect-video shadow-md`}
              data-fancybox={message.image}
              data-src={message.image}
              data-thumb={message.image}
            >
              <Image
                src={message.image}
                objectFit="cover"
                objectPosition="center"
                layout="fill"
              />
            </div>
          </div>
        </div>
      )}
      {message.text && (
        <div className={`chat ${right ? "chat-end" : "chat-start"}`}>
          {user.profilePhoto ? (
            <div className="avatar chat-image">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.profilePhoto} alt="Avatar" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="mask mask-squircle w-12 h-12 bg-neutral-focus text-neutral-content">
                <span className="text-xl uppercase">{`${user.firstName.slice(
                  0,
                  1
                )}${user.lastName.slice(0, 1)}`}</span>
              </div>
            </div>
          )}
          {/* <div className="chat-header">{user.username}</div> */}
          <div
            className={`chat-bubble ${
              right ? "chat-bubble-secondary" : "chat-bubble-primary"
            }`}
          >
            {message.text}
          </div>
          <time className="chat-footer opacity-50">
            {moment(message.createdAt).format("Do MMMM, h:mm A")}
          </time>
        </div>
      )}
    </>
  );
};

export default MessageCard;
