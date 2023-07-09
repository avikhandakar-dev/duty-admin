import LoadingScreen from "@components/LoadingScreen";
import {
  getStartingGigByServiceId,
  togglePopular,
  toggleTop,
  toggleTrending,
  toggleSuggest,
} from "@lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { toast } from "react-hot-toast";

const StartingGig = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard } = router.query;
  const [gigData, setGigData] = useState(null);
  const [doRefresh, setDoRefresh] = useState(false);

  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getService = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getStartingGigByServiceId(dashboard);
      setGigData(data.gig);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePopularFn = async (id) => {
    const Request = async () => {
      try {
        await togglePopular(id);
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
  };

  const toggleTopFn = async (id) => {
    const Request = async () => {
      try {
        await toggleTop(id);
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
  };

  const toggleTrendingFn = async (id) => {
    const Request = async () => {
      try {
        await toggleTrending(id);
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
  };

  const toggleSuggestFn = async (id) => {
    const Request = async () => {
      try {
        await toggleSuggest(id);
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
  };

  useEffect(() => {
    getService();
  }, [dashboard, doRefresh]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (!gigData) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {gigData.images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="w-full aspect-square object-cover rounded"
          />
        ))}
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">{gigData.title}</p>
        <p className="mt-2">{gigData.description}</p>
        <p className="text-lg font-semibold mt-2">
          Starting Price: ${gigData.price}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">Service List</p>
        <div className="mt-2">
          <Tab.Group
            as="div"
            className="flex gap-8 divide-x divide-gray-500 overflow-x-hidden relative max-h-[250px] overflow-hidden"
          >
            <div className="flex-shrink-0">
              <Tab.List className="flex flex-col w-max gap-4">
                <Tab
                  className={({ selected }) =>
                    cn(
                      "w-full text-left font-medium relative focus:outline-none whitespace-nowrap",
                      selected
                        ? "!text-primary rounded-lg border-primary"
                        : "hover:text-primary"
                    )
                  }
                >
                  <span className="capitalize">Category</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    cn(
                      "w-full text-left font-medium relative focus:outline-none whitespace-nowrap",
                      selected
                        ? "!text-primary rounded-lg border-primary"
                        : "hover:text-primary"
                    )
                  }
                >
                  <span className="">Extra Facilities</span>
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels className={`pl-8`}>
              <Tab.Panel className="">
                <div className="flex flex-wrap gap-4">
                  {gigData?.skills.map((item, index) => (
                    <span className="mr-1">{item}</span>
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  {gigData.facilites?.selectedOptions?.length > 0 ||
                  gigData.facilites?.customOptions?.length > 0 ? (
                    <div className="flex flex-col flex-wrap">
                      {gigData.facilites.selectedOptions.map((item, index) => (
                        <span className="mr-1">
                          {item.title}
                          {index + 1 <
                            gigData.facilites.selectedOptions?.length && ","}
                        </span>
                      ))}

                      {gigData.facilites.customOptions?.map((item, index) => (
                        <span className="mr-1">
                          {item.title}
                          {index + 1 <
                            gigData.facilites.customOptions?.length && ","}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No extra facilites</p>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <div className="mt-8 max-w-lg">
        <div className="grid grid-cols-4 bg-gray-600 p-2 rounded">
          <p>Popular</p>
          <p>Top</p>
          <p>Tranding</p>
          <p>Suggest</p>
        </div>
        <div className="grid grid-cols-4 mt-4">
          <input
            onChange={() => togglePopularFn(gigData.id)}
            type="checkbox"
            className="toggle toggle-primary"
            checked={gigData.popular}
          />
          <input
            onChange={() => toggleTopFn(gigData.id)}
            type="checkbox"
            className="toggle toggle-primary"
            checked={gigData.top}
          />
          <input
            onChange={() => toggleTrendingFn(gigData.id)}
            type="checkbox"
            className="toggle toggle-primary"
            checked={gigData.trending}
          />
          <input
            onChange={() => toggleSuggestFn(gigData.id)}
            type="checkbox"
            className="toggle toggle-primary"
            checked={gigData.suggest}
          />
        </div>
      </div>
    </div>
  );
};

export default StartingGig;
