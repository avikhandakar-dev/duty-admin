import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { sendMessageToAllService, sendMessageToAllUser } from "@lib/api";
import { uploadFiles } from "@lib/utils";

const MessageModal = ({ isOpen, closeModal, isVendor = true }) => {
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handelSumbit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      let image = null;
      if (file) {
        const images = await uploadFiles([file], "IMAGE");
        image = images[0];
      }
      if (isVendor) {
        await sendMessageToAllService({
          text,
          image,
        });
      } else {
        await sendMessageToAllUser({
          text,
          image,
        });
      }
      toast.success("Message send successfully!");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

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
                  <div className="mt-8">
                    <form onSubmit={handelSumbit} className="mt-4">
                      <h1 className="text-xl font-semibold mb-4">
                        Send message to all {isVendor ? "services" : "users"}
                      </h1>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="w-full mb-2 bg-gray-800 textarea textarea-bordered rounded"
                        placeholder="Write your message here..."
                      />
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className={`btn btn-primary rounded btn-wide ${
                            isSending && "loading"
                          }`}
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MessageModal;
