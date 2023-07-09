import LoadingScreen from "@components/LoadingScreen";
import { Messages } from "@components/Orders/Messages";
import { getMessagesByConversation } from "@lib/api";
import { useState, useEffect } from "react";

const ChatViewVendor = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const fetchData = async (merge = false, loading = true) => {
    if (!conversation) return;
    try {
      setFetchingMoreData(true);
      if (loading) {
        setIsLoading(true);
      }
      const { data } = await getMessagesByConversation(
        conversation.id,
        limit,
        skip
      );
      if (merge) {
        setMessages((prev) => [...prev, ...data.messages]);
      } else {
        setMessages(data.messages);
      }
      if (data.messages.length < limit) {
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
    fetchData(true, false);
  }, [skip]);

  useEffect(() => {
    setMessages([]);
    setIsEnd(false);
    fetchData(false, true);
  }, [conversation]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (messages?.length === 0 || !conversation) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <Messages users={conversation?.users} messages={messages} />
      {!isEnd && (
        <div className="flex justify-center mt-4">
          <button
            className={`btn btn-primary btn-wide ${
              fetchingMoreData && "loading"
            }`}
            onClick={() => setSkip(skip + limit)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatViewVendor;
