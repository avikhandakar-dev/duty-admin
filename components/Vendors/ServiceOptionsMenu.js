import { Menu } from "@headlessui/react";
import {
  toggleAcceptService,
  toggleDeleteService,
  toggleHideService,
} from "@lib/api";
import { toast } from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";

const ServiceOptionsMenu = ({ dashboard }) => {
  const handelApprove = async () => {
    if (!dashboard) {
      return toast.error("No dashboard found!");
    }
    const userAction = confirm(
      `Are you sure you want to approve ${dashboard?.serviceCenterName}?`
    );
    if (userAction) {
      const Request = async () => {
        try {
          await toggleAcceptService(dashboard?.id);
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
    }
  };
  const handelHide = async () => {
    if (!dashboard) {
      return toast.error("No dashboard found!");
    }
    const userAction = confirm(
      `Are you sure you want to ${dashboard.hide ? "Unhide" : "hide"} ${
        dashboard?.serviceCenterName
      }?`
    );
    if (userAction) {
      const Request = async () => {
        try {
          await toggleHideService(dashboard?.id);
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
    }
  };
  const handelDelete = async () => {
    if (!dashboard) {
      return toast.error("No dashboard found!");
    }
    const userAction = confirm(
      `Are you sure you want to delete ${dashboard?.serviceCenterName}?`
    );
    if (userAction) {
      const Request = async () => {
        try {
          await toggleDeleteService(dashboard?.id);
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
    }
  };
  if (!dashboard) return null;
  return (
    <Menu as="div" className=" relative">
      <Menu.Button>
        <HiDotsVertical className="text-xl" />
      </Menu.Button>
      <Menu.Items className="flex gap-2 w-max z-50 flex-col absolute -ml-20 bg-gray-600 shadow-3xl  rounded-md px-2 py-1">
        <Menu.Item>
          <a
            onClick={handelApprove}
            className=" cursor-pointer hover:text-primary"
          >
            Approve this dashboard
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={handelHide}
            className=" cursor-pointer hover:text-primary"
          >
            {dashboard.hide ? "Unhide" : "Hide"} this dashboard
          </a>
        </Menu.Item>
        <Menu.Item>
          <a className=" cursor-pointer hover:text-primary">
            Ban this dashboard
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={handelDelete}
            className=" cursor-pointer hover:text-primary"
          >
            Delete this dashboard
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ServiceOptionsMenu;
