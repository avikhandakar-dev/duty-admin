import LoadingScreen from "@components/LoadingScreen";
import { getServiceById } from "@lib/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AboutVendor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { dashboard } = router.query;
  const [dashboardData, setDashboardData] = useState(null);

  const getService = async () => {
    if (!dashboard) return;
    try {
      setIsLoading(true);
      const { data } = await getServiceById(dashboard);
      setDashboardData(data.service);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getService();
  }, [dashboard]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (!dashboardData) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex gap-6 mb-8 rounded-md overflow-hidden w-full bg-slate-900">
        <div className="w-80 flex-shrink-0 relative">
          <img
            className="w-full h-full object-cover rounded-md"
            src={dashboardData.wallPhoto}
            alt=""
          />
          <img
            className="w-16 aspect-square rounded-full object-cover absolute left-1/2 bottom-2 -translate-x-1/2 border-2"
            src={dashboardData.profilePhoto}
            alt=""
          />
        </div>
        <div className="flex-1 py-4">
          <p>
            <span className="font-semibold">Service Center Name:</span>{" "}
            {dashboardData.serviceCenterName}
          </p>
          <p>
            <span className="font-semibold">Service Provider Name:</span>{" "}
            {dashboardData.providerInfo?.name}
          </p>
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {dashboardData.providerInfo?.gender}
          </p>
          <p>
            <span className="font-semibold">Business Account Created:</span>{" "}
            {moment(dashboardData.createdAt).format("Do MMMM, h:mm A")}
          </p>
          <p>
            <span className="font-semibold">Position:</span>{" "}
            {dashboardData.providerInfo?.position}
          </p>
          <p>
            <span className="font-semibold">Team & Member:</span>{" "}
            {dashboardData.worker}
          </p>
          <div className="py-2">
            <p className="font-semibold">Address</p>
            <div>{`${dashboardData.location.region} ${dashboardData.location.city}, ${dashboardData.location.area}, ${dashboardData.location.address}`}</div>
          </div>
          <div className="py-2">
            <p className="font-semibold">Working Time</p>
            {dashboardData.t47 ? (
              <p>24/7</p>
            ) : (
              <div className="">
                {dashboardData.workingTime.map((item) => (
                  <div className="grid grid-cols-2">
                    <div className=" ">
                      <p className="text-sm">{item.day}</p>
                    </div>
                    <div className="">
                      <p className="text-sm">
                        {moment(item.open, ["HH:mm"]).format("h:mm A")} -{" "}
                        {moment(item.close, ["HH:mm"]).format("h:mm A")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" space-y-4">
        <div>
          <p className="font-semibold text-xl mb-2">About</p>
          <p>{dashboardData.about}</p>
        </div>
        <div>
          <p className="font-semibold text-xl mb-2">Keywords</p>
          <p>{dashboardData.keywords.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutVendor;
