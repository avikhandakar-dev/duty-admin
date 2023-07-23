import FixedServices from "@components/Services/FixedServices";
import PackageServices from "@components/Services/PackageServices";
import StartingServices from "@components/Services/StartingServices";
import { Tab } from "@headlessui/react";
import { useState } from "react";

const ServicesPage = () => {
  const [doRefreash, setDoReFresh] = useState(false);
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    {
      name: "Starting",
      content: <StartingServices refreash={doRefreash} />,
    },
    {
      name: "Fixed",
      content: <FixedServices refreash={doRefreash} />,
    },
    {
      name: "Package",
      content: <PackageServices refreash={doRefreash} />,
    },
  ];
  return (
    <>
      <Tab.Group as="div" className="relative">
        <button
          onClick={() => setDoReFresh(!doRefreash)}
          className=" absolute right-0 top-2 btn btn-link capitalize"
        >
          Refreash
        </button>
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
    </>
  );
};

ServicesPage.title = "Services";
export default ServicesPage;
