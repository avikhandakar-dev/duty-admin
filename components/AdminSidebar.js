import { Fragment, useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import ActiveLink from "@components/ActiveLink";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { adminSidebarTabs } from "layouts/admin";
import AuthContext from "@lib/authContext";

const AdminSidebar = ({ isOpen, closeModal }) => {
  const { logOut } = useContext(AuthContext);
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog
        onClose={closeModal}
        as="div"
        className="fixed inset-0 w-full h-full z-50"
      >
        <Transition.Child
          enter="transition-opacity ease-in-out-expo duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out-expo duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out-expo duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out-expo duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as={Fragment}
        >
          <div className="left-0 shadow-xl absolute top-0 h-full w-72 bg-primary">
            <div className="w-full h-full flex flex-col justify-between py-6">
              <div className="w-full flex flex-col space-y-2 px-6">
                <div className="w-full flex justify-end">
                  <a
                    className="text-primary-content"
                    onClick={() => closeModal()}
                  >
                    <IoMdClose className="text-2xl" />
                  </a>
                </div>
                {adminSidebarTabs.map((item) => (
                  <span onClick={() => closeModal()} key={item.title}>
                    <ActiveLink
                      key={item.title}
                      activeClassName="!text-accent"
                      href={item.href}
                    >
                      <a className="focus:outline-none hover:text-blue text-primary-content flex items-center py-2 hover:bg-primary-50 rounded-full px-4 mr-auto">
                        <i className="text-2xl mr-4 text-left">{item.icon}</i>
                        <p className="text-lg whitespace-nowrap font-semibold text-left">
                          {item.title}
                        </p>
                      </a>
                    </ActiveLink>
                  </span>
                ))}
              </div>

              <div className="w-full relative px-6">
                <button
                  onClick={logOut}
                  className="focus:outline-none text-primary-content hover:text-primary-400 duration-300 flex items-center py-2 px-4 rounded-full mr-auto mb-3"
                >
                  <i className="text-2xl mr-4 text-left">
                    <RiLogoutBoxRLine />
                  </i>
                  <p className="text-lg font-semibold text-left">Logout</p>
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default AdminSidebar;
