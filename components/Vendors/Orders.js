import { Tab } from "@headlessui/react";
import { OrderStatus } from "pages";
import { useState } from "react";
import FixedOrderVendor from "./FixedOrder";
import PackageOrderVendor from "./PackageOrder";
import StartingOrderVendor from "./StartingOrder";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const OrdersVendor = () => {
  const [status, setStatus] = useState("");

  const Tabs = [
    {
      name: "Starting",
      content: <StartingOrderVendor status={status} />,
    },
    {
      name: "Fixed",
      content: <FixedOrderVendor status={status} />,
    },
    {
      name: "Package",
      content: <PackageOrderVendor status={status} />,
    },
  ];

  return (
    <div className="relative">
      <div>
        <Tab.Group>
          <Tab.List className="flex w-max">
            {Tabs.map((item, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  cn(
                    "w-full relative border-b dark:text-white px-4 py-2.5 focus:outline-none whitespace-nowrap",
                    selected
                      ? "text-primary dark:text-primary border-primary"
                      : "hover:text-primary"
                  )
                }
              >
                {index < Tabs.length - 1 && (
                  <span className=" absolute right-0 w-[1px] h-6 top-1/2 -translate-y-1/2 bg-gray-100" />
                )}
                <span className="">{item.name}</span>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="pt-8">
            {Tabs.map((item, index) => (
              <Tab.Panel>{item.content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="select select-bordered bg-transparent w-full max-w-xs absolute right-0 top-0"
      >
        <option value="" selected>
          All
        </option>
        {OrderStatus.map((status) => (
          <option value={status.value}>{status.name}</option>
        ))}
      </select>
    </div>
  );
};

export default OrdersVendor;
