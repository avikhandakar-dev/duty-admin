import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import { createNote, getNotesForUser } from "@lib/api";
import { toast } from "react-hot-toast";
import LoadingScreen from "@components/LoadingScreen";
import moment from "moment";

const NoteModalUser = ({ isOpen, closeModal }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const elm = useRef(null);

  const scrollToBottom = () => {
    elm?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handelSumbit = async (e) => {
    e.preventDefault();
    if (!id) return;
    setIsSending(true);
    try {
      await createNote({
        userId: id,
        text: text,
      });
      await getAllNotes();
      toast.success("Note added successfully");
      setText("");
      scrollToBottom();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  const getAllNotes = async () => {
    if (!id) return;
    try {
      const { data } = await getNotesForUser(id);
      setNotes(data.notes);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [notes]);

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
                    {isLoading ? (
                      <LoadingScreen fullScreen={false} />
                    ) : (
                      <div className="py-8">
                        {notes.length === 0 ? (
                          <p>No notes found</p>
                        ) : (
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {notes.map((note) => (
                              <div className="border p-4 rounded border-gray-700">
                                <p>{note.text}</p>
                                <p className="text-sm opacity-50">
                                  <span className="font-bold">
                                    {note.admin.name}
                                  </span>{" "}
                                  (
                                  {moment(note.createdAt).format(
                                    "Do MMMM, h:mm A"
                                  )}
                                  )
                                </p>
                              </div>
                            ))}
                            <div className="" ref={elm} />
                          </div>
                        )}
                      </div>
                    )}
                    <form onSubmit={handelSumbit} className="mt-4">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="w-full bg-gray-800 textarea textarea-bordered rounded"
                        placeholder="Write your note here..."
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className={`btn btn-primary rounded btn-wide ${
                            isSending && "loading"
                          }`}
                        >
                          Save
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

export default NoteModalUser;
