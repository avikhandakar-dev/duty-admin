import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import OrderDetailsFixed from "./OrderDetailsFixed";
import OrderDetailsPackage from "./OrderDetailsPackage";
import OrderDetailsStarting from "./OrderDetailsStarting";
import { IoMdCloseCircle } from "react-icons/io";

const OrderDetailsModal = ({ isOpen, closeModal, order, selectedSubs }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full border-2 max-w-4xl transform overflow-hidden rounded-2xl bg-base-300 p-6 text-left align-middle shadow-xl transition-all">
                  <IoMdCloseCircle
                    onClick={closeModal}
                    className="text-primary text-2xl absolute right-4 top-4 cursor-pointer"
                  />
                  {order.type === "STARTING" && (
                    <OrderDetailsStarting order={order} />
                  )}
                  {order.type === "ONETIME" && (
                    <OrderDetailsFixed order={order} />
                  )}
                  {order.type === "PACKAGE" && (
                    <OrderDetailsPackage order={order} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OrderDetailsModal;
