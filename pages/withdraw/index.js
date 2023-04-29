import CancelledWithdrawTable from "@components/Withdraw/CancelledWithdrawTable";
import CompletedWithdrawTable from "@components/Withdraw/CompletedWithdrawTablw";
import PendingWithdrawTable from "@components/Withdraw/PendingWithdrawTable";
import { Tab } from "@headlessui/react";

const WithdrawPage = () => {
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    {
      name: "Pending",
      content: <PendingWithdrawTable />,
    },
    {
      name: "Completed",
      content: <CompletedWithdrawTable />,
    },
    {
      name: "Cancelled",
      content: <CancelledWithdrawTable />,
    },
  ];
  return (
    <>
      <Tab.Group>
        <Tab.List className="flex w-max mx-auto">
          {Tabs.map((item, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                cn(
                  "w-full relative border-b dark:text-white px-2 py-2.5 focus:outline-none whitespace-nowrap",
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

WithdrawPage.title = "Withdraw";
export default WithdrawPage;
