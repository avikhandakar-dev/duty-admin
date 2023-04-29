import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { Formik, Form } from "formik";
import { Input } from "@components/Input";
import * as Yup from "yup";
import { bannedOrder, bannedService } from "@lib/api";
import moment from "moment";

const BanServiceForm = ({ isOpen, closeModal, serviceId, isSuccess }) => {
  const validate = Yup.object({
    duration: Yup.number()
      .required("Duration is required")
      .min(1, "Invalid duration")
      .max(1000000, "Invalid duration"),
    reason: Yup.string().required("Reason is required"),
    type: Yup.string().required("Ban type is required"),
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all relative">
                  <IoMdCloseCircle
                    onClick={closeModal}
                    className="text-primary text-2xl absolute right-4 top-4 cursor-pointer"
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6"
                  >
                    Ban Service
                  </Dialog.Title>
                  <div>
                    <Formik
                      initialValues={{
                        duration: "",
                        reason: "",
                        type: "",
                      }}
                      validationSchema={validate}
                      onSubmit={async (values, onSubmitProps) => {
                        try {
                          if (values.duration < 1) {
                            return toast.error("Invalid duration");
                          }
                          const now = new Date();
                          const bannedUntil = moment(now).add(
                            values.duration,
                            "days"
                          );
                          if (values.type === "service") {
                            await bannedService({
                              serviceId: serviceId,
                              bannedUntil: new Date(bannedUntil),
                              bannedReason: values.reason,
                            });
                          } else {
                            await bannedOrder({
                              serviceId: serviceId,
                              bannedUntil: new Date(bannedUntil),
                              bannedReason: values.reason,
                            });
                          }
                          toast.success("Successfully banned this service!");
                          isSuccess({
                            type: values.type,
                            bannedUntil: new Date(bannedUntil),
                            bannedReason: values.reason,
                          });
                          closeModal();
                        } catch (error) {
                          console.log(error);
                          toast.error(error.response?.data?.msg);
                        }
                      }}
                    >
                      {(formik) => (
                        <>
                          <Form
                            className="relative font-body grid gap-2"
                            onSubmit={formik.handleSubmit}
                          >
                            <Input as="select" name="type">
                              <option value="" selected>
                                Ban type...
                              </option>
                              <option value="service">Service</option>
                              <option value="order">Order</option>
                            </Input>
                            <Input
                              type="number"
                              name="duration"
                              placeholder="Duration in days"
                            />
                            <Input
                              style={{ height: "100px" }}
                              as="textarea"
                              type="text"
                              name="reason"
                              placeholder="Reason"
                            />

                            <button
                              type="submit"
                              className={`btn btn-primary mt-4 ${
                                formik.isSubmitting && "loading"
                              }`}
                            >
                              {formik.isSubmitting ? "Please Wait" : "Submit"}
                            </button>
                          </Form>
                        </>
                      )}
                    </Formik>
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

export default BanServiceForm;
