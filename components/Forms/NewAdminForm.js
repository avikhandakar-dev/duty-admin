import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { Formik, Form } from "formik";
import { Input } from "@components/Input";
import * as Yup from "yup";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { addNewAdmin } from "@lib/api";

const roles = [
  {
    title: "Admin",
    value: "ADMIN",
  },
  {
    title: "Moderator",
    value: "MODERATOR",
  },
  {
    title: "Super",
    value: "SUPER",
  },
];
const NewAdminForm = ({ isOpen, closeModal, isSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const validate = Yup.object({
    emailAddress: Yup.string()
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        "Email is ot Valid"
      )
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    role: Yup.string().required("Role is required"),
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
                    Add new user
                  </Dialog.Title>
                  <div>
                    <Formik
                      initialValues={{
                        emailAddress: "",
                        password: "",
                        name: "",
                        phone: "",
                        role: "",
                      }}
                      validationSchema={validate}
                      onSubmit={async (values, onSubmitProps) => {
                        try {
                          await addNewAdmin({
                            email: values.emailAddress,
                            password: values.password,
                            name: values.name,
                            phone: values.phone,
                            role: values.role,
                          });
                          isSuccess();
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
                            <Input type="text" name="name" placeholder="Name" />
                            <Input
                              type="text"
                              name="emailAddress"
                              placeholder="Email"
                            />
                            <Input
                              type={passwordShow ? "text" : "password"}
                              name="password"
                              placeholder="Password"
                              icon={passwordShow ? <FaEye /> : <FaEyeSlash />}
                              onClickIcon={() =>
                                setPasswordShow(passwordShow ? false : true)
                              }
                            />
                            <Input as="select" type="text" name="role">
                              <option value="" disabled>
                                Role...
                              </option>
                              {roles.map((role, i) => {
                                return (
                                  <option
                                    key={i}
                                    value={role.value}
                                    className="bg-white text-primary-600 text-base capitalize"
                                  >
                                    {role.title}
                                  </option>
                                );
                              })}
                            </Input>
                            <Input
                              type="text"
                              name="phone"
                              placeholder="Phone"
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

export default NewAdminForm;
