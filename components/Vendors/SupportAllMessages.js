import LoadingScreen from "@components/LoadingScreen";
import { Messages } from "@components/Orders/Messages";
import {
  getSupportConversationsByService,
  sendMessageFromDutySupport,
  sendMessageToService,
  sendSupportMessageFromDutySupport,
} from "@lib/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const SupportAllMessages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [conversationUsers, setConversationUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const router = useRouter();
  const { dashboard, id } = router.query;
  const [text, setText] = useState("");

  const fetchData = async () => {
    if (isEnd || !dashboard) return;
    try {
      setFetchingMoreData(true);
      const { data } = await getSupportConversationsByService(
        dashboard,
        limit,
        skip
      );
      setConversationUsers(data.conversation?.users);
      setMessages(data.conversation?.messages);
      setMessages([...messages, ...data.conversation?.messages]);
      if (data.conversation?.messages.length < limit) {
        setIsEnd(true);
      }
    } catch (error) {
      setMessages([]);
      console.log(error);
    } finally {
      setIsLoading(false);
      setFetchingMoreData(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!id) return;
    try {
      setIsSending(true);
      const { data } = await sendMessageToService({
        text,
        receiverId: id,
        serviceId: dashboard,
      });
      toast.success("Successfully sent message!");
      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="bg-gray-700 p-4 rounded">
      {messages.length === 0 ? (
        <div>No message found</div>
      ) : (
        <div className="flex-1 max-h-96 overflow-y-auto px-4">
          <Messages users={conversationUsers} messages={messages} />
          {!isEnd && (
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={() => setSkip(skip + limit)}
                className="btn btn-primary btn-outline btn-wide"
              >
                {fetchingMoreData ? "Please wait..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={sendMessage} className="mt-8 w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          className="textarea w-full"
        />
        <div className="flex justify-end mt-4">
          <button
            className={`btn btn-warning btn-wide rounded ${
              isSending && "loading"
            }`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportAllMessages;
