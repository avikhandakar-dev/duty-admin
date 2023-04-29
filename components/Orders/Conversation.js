import LoadingScreen from "@components/LoadingScreen";
import { getConversationBetweenVendorAndCustomer } from "@lib/api";
import { useEffect, useState } from "react";
import { Messages } from "./Messages";

const Conversation = ({ vendorId, customerId }) => {
  const [messages, setMessages] = useState([]);
  const [conversationUsers, setConversationUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const fetchData = async () => {
    if (isEnd) return;
    try {
      setFetchingMoreData(true);
      const { data } = await getConversationBetweenVendorAndCustomer(
        vendorId,
        customerId,
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

  useEffect(() => {
    fetchData();
  }, [skip]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (!messages || messages?.length < 1) {
    return (
      <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-secondary rounded">
        <div className="px-4 py-3 bg-secondary text-primary-content card-title">
          Conversation
        </div>
        <div className="card-body py-16 text-center">No conversation yet</div>
        {/* <pre className="mt-96">{JSON.stringify(messages, null, 4)}</pre> */}
      </div>
    );
  }

  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-secondary rounded">
      <div className="px-4 py-3 bg-secondary text-secondary-content card-title">
        Conversation
      </div>
      <div className="card-body max-w-xl mx-auto">
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
    </div>
  );
};

export default Conversation;
