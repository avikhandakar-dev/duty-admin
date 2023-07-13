import { Fragment, useContext, useEffect, useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import {
  BiArrowBack,
  BiCategory,
  BiFoodMenu,
  BiMailSend,
  BiMessageDetail,
} from "react-icons/bi";
import Link from "next/link";
import ActiveLink from "@components/ActiveLink";
import { RiLogoutBoxRLine, RiShieldUserLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { IoIosImages, IoMdSettings } from "react-icons/io";
import { BsBox } from "react-icons/bs";
import { TbBusinessplan } from "react-icons/tb";
import { TiBusinessCard } from "react-icons/ti";
import {
  MdDesignServices,
  MdOutlineReportProblem,
  MdSupportAgent,
} from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import useMediaQuery from "@lib/hooks/useMediaQuery";
import AdminSidebar from "@components/AdminSidebar";
import AuthContext from "@lib/authContext";
import useBaseStore from "@lib/hooks/useBaseStore";

export const adminSidebarTabs = [
  { icon: <BiFoodMenu />, title: "Orders", href: "/" },
  { icon: <TbBusinessplan />, title: "Withdraw", href: "/withdraw" },
  {
    icon: <RiShieldUserLine />,
    title: "Admin",
    href: "/admin",
  },
  { icon: <FaUsers />, title: "Customers", href: "/customers" },
  { icon: <TiBusinessCard />, title: "Vendors", href: "/vendors" },
  { icon: <MdDesignServices />, title: "Services", href: "/services" },
  { icon: <IoIosImages />, title: "Verifications", href: "/verifications" },
  { icon: <MdSupportAgent />, title: "Support", href: "/support" },
  { icon: <BiMailSend />, title: "Contact", href: "/contact" },
  { icon: <MdOutlineReportProblem />, title: "Report", href: "/report" },
  {
    icon: <IoMdSettings />,
    title: "Settings",
    href: "/settings",
  },
];
const AdminLayout = ({ children, title, cta }) => {
  const [showAdimnSidebar, setShowAdminSidebar] = useState(false);
  const router = useRouter();
  const isSm = useMediaQuery("(max-width: 640px)");
  const { user, authenticating, logOut } = useContext(AuthContext);
  const baseStore = useBaseStore();
  useEffect(() => {
    const unsubs = async () => {
      if (!isSm) {
        setShowAdminSidebar(false);
      }
    };
    unsubs();
  }, [isSm]);

  useEffect(() => {
    const redirect = () => {
      if (authenticating) return;
      if (!user) {
        return router.replace("/login");
      }
    };
    redirect();
  }, [user, authenticating]);

  return (
    <Fragment>
      <AdminSidebar
        isOpen={showAdimnSidebar}
        closeModal={() => setShowAdminSidebar(false)}
      />
      <div className="flex mx-auto h-screen w-full">
        {baseStore.showSidebar && (
          <aside className="lg:w-1/5 hidden  w-[70px] items-center lg:items-baseline lg:min-w-[250px] lg:overflow-y-auto border-r border-base-200 px-2 lg:px-6 py-2 sm:flex sm:flex-col justify-between bg-base-200">
            <div className="w-full">
              <a
                onClick={() => router.back()}
                className="h-12 w-12 cursor-pointer flex justify-center items-center ml-1 mb-4 hover:text-primaryLight text-3xl text-primary duration-300"
              >
                <BiArrowBack />
              </a>
              <div className="">
                {adminSidebarTabs.map((tab) => (
                  <ActiveLink
                    key={tab.title}
                    activeClassName="!text-primary"
                    href={tab.href}
                  >
                    <a className="focus:outline-none hover:text-primary text-primary-900 flex items-center py-2 px-4 hover:bg-primaryLight/30 rounded-full mr-auto mb-3">
                      <i className="text-2xl lg:mr-4 text-left">{tab.icon}</i>
                      <p className="text-lg whitespace-nowrap font-semibold text-left hidden lg:block">
                        {tab.title}
                      </p>
                    </a>
                  </ActiveLink>
                ))}
              </div>
            </div>
            <div className="lg:w-full relative mt-16">
              <button
                onClick={logOut}
                className="focus:outline-none text-primary-600 hover:text-primary-400 duration-300 flex items-center py-2 px-4 rounded-full mr-auto mb-3"
              >
                <i className="text-2xl lg:mr-4 text-left">
                  <RiLogoutBoxRLine />
                </i>
                <p className="text-lg font-semibold text-left hidden lg:block">
                  Logout
                </p>
              </button>
            </div>
          </aside>
        )}
        {/* Main section */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto flex-1">
          <div className="px-5 py-3 border-b border-base-200 sticky top-0 flex items-center justify-between bg-base-200 z-20 bg-opacity-70 backdrop-blur-md backdrop-saturate-150">
            <div className="flex gap-2 items-center">
              <span className="sm:hidden">
                <a
                  onClick={() => {
                    setShowAdminSidebar(true);
                  }}
                >
                  <HiMenuAlt2 />
                </a>
              </span>
              <span className="hidden sm:block cursor-pointer">
                <a
                  onClick={() => {
                    baseStore.setShowSidebar(!baseStore.showSidebar);
                  }}
                >
                  <HiMenuAlt2 />
                </a>
              </span>
              <h1 className="text-xl font-bold text-primary-900">
                {title || "Admin"}
              </h1>
            </div>
            <div className="text-right">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 max-w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
