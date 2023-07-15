import LoadingScreen from "@components/LoadingScreen";
import ChatViewVendor from "@components/Vendors/ChatView";
import { getAllConversations } from "@lib/api";
import { useEffect, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const Filters = [
  {
    name: "All",
    value: "",
  },
  {
    name: "T",
    value: "Today",
  },
  {
    name: "W",
    value: "ThisWeek",
  },
  {
    name: "M",
    value: "ThisMonth",
  },
  {
    name: "Y",
    value: "ThisYear",
  },
];

const ChatsPage = () => {
  const [conversations, setConversations] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const getConversation = async () => {
    try {
      setIsFiltering(true);
      const { data } = await getAllConversations(limit, skip, selectedFilter);
      setConversations(data.conversations);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    getConversation();
  }, [skip, selectedFilter]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (conversations?.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        {Filters.map((filter, i) => (
          <label className="label cursor-pointer gap-1">
            <input
              className="radio radio-sm radio-primary"
              type="radio"
              value={filter.value}
              checked={selectedFilter === filter.value}
              onChange={() => setSelectedFilter(filter.value)}
            />
            <span className="label-text">{filter.name}</span>
          </label>
        ))}
      </div>
      <div className="flex">
        <div className="w-92 relative flex-shrink-0 h-screen overflow-y-auto border-r border-gray-600">
          {isFiltering && (
            <span className="absolute inset-0 w-full h-full bg-base-200 bg-opacity-0 z-[15] backdrop-blur-sm" />
          )}
          <div className="space-y-4">
            {conversations.map((conversation) => {
              const user1 = conversation.users[0];
              const user2 = conversation.users[1];

              return (
                <div
                  onClick={() => setSelectedConversation(conversation)}
                  key={conversation.id}
                  className={`cursor-pointer rounded-md grid grid-cols-2 gap-2 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4 items-center flex-1">
                      {user1?.user?.profilePhoto ? (
                        <div className={`avatar`}>
                          <div className="w-10 rounded-full">
                            <img src={user1?.user?.profilePhoto} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="mask mask-squircle w-10 h-10 bg-neutral-focus text-neutral-content">
                            <span className="text-xl uppercase">{`${user1?.user?.name.slice(
                              0,
                              1
                            )}`}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold line-clamp-1 text-sm">
                          {user1?.user.name}
                        </h4>
                        <p className="text-xs line-clamp-1 text-gray-400">
                          {user1?.user.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4 items-center flex-1">
                      {user2?.user?.profilePhoto ? (
                        <div className={`avatar`}>
                          <div className="w-10 rounded-full">
                            <img src={user2?.user?.profilePhoto} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="mask mask-squircle w-10 h-10 bg-neutral-focus text-neutral-content">
                            <span className="text-xl uppercase">{`${user2?.user?.name.slice(
                              0,
                              1
                            )}`}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold line-clamp-1 text-sm">
                          {user2?.user.name}
                        </h4>
                        <p className="text-xs line-clamp-1 text-gray-400">
                          {user2?.user.phone}
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

export default ChatsPage;
