import SupportsChat from "./SupportChat";
import { Tab } from "@headlessui/react";
import SupportAllMessages from "./SupportAllMessages";

const Supports = () => {
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    {
      name: "Support Chat",
      content: <SupportsChat />,
    },
    {
      name: "All Messages",
      content: <SupportAllMessages />,
    },
  ];

  return (
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
      <Tab.Panels className="p-4">
        {Tabs.map((item, index) => (
          <Tab.Panel>{item.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Supports;
