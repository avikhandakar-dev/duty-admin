import LoadingScreen from "@components/LoadingScreen";
import { getConversationsByService } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ChatViewVendor from "./ChatView";

const ChatVendor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard, id } = router.query;
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

  const getConversation = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getConversationsByService(dashboard, limit, skip);
      setConversations(data.conversations);
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
    getConversation();
  }, [dashboard, skip]);

  useEffect(() => {
    setSelectedConversation(null);
  }, [dashboard]);

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      if (!selectedConversation) {
        setSelectedConversation(conversations[0]);
      }
    }
  }, [conversations]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (conversations?.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="w-48 flex-shrink-0 h-screen overflow-y-auto border-r border-gray-600">
          <div className="space-y-4">
            {conversations.map((conversation) => {
              const receiver = conversation.users?.find(
                (person) => person.userId !== id
              );
              return (
                <div
                  onClick={() => setSelectedConversation(conversation)}
                  key={conversation.id}
                  className={`cursor-pointer rounded-md ${
                    selectedConversation?.id === conversation.id
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4 items-center flex-1">
                      {receiver?.user?.profilePhoto ? (
                        <div className={`avatar`}>
                          <div className="w-10 rounded-full">
                            <img src={receiver?.user?.profilePhoto} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="mask mask-squircle w-10 h-10 bg-neutral-focus text-neutral-content">
                            <span className="text-xl uppercase">{`${receiver?.user?.name.slice(
                              0,
                              1
                            )}`}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold line-clamp-1 text-sm">
                          {receiver?.user.name}
                        </h4>
                        <p className="text-xs line-clamp-1 text-gray-400">
                          {receiver?.user.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
        <div className="flex-1 h-screen overflow-y-auto px-4">
          <ChatViewVendor conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
};

export default ChatVendor;
