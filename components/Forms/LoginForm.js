import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../Input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Link from "next/link";
import AuthContext from "@lib/authContext";
import { toast } from "react-hot-toast";
import { signIn } from "@lib/api";

export const LoginForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { setToken } = useContext(AuthContext);

  const validate = Yup.object({
    emailAddress: Yup.string()
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        "Email is ot Valid"
      )
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="w-full max-w-xl card p-5 shadow-md border border-base-300 bg-base-200 rounded-md">
      <h1 className="text-xl sm:text-3xl text-center font-bold text-primary-100 capitalize">
        Login
      </h1>
      <Formik
        initialValues={{
          emailAddress: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={async (values, onSubmitProps) => {
          try {
            const { data } = await signIn({
              email: values.emailAddress,
              password: values.password,
            });
            setToken(data.token);
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
              <Input type="text" name="emailAddress" placeholder="Email" />
              <Input
                type={passwordShow ? "text" : "password"}
                name="password"
                placeholder="Password"
                icon={passwordShow ? <FaEye /> : <FaEyeSlash />}
                onClickIcon={() => setPasswordShow(passwordShow ? false : true)}
              />

              <button
                type="submit"
                className={`btn btn-primary ${
                  formik.isSubmitting && "loading"
                }`}
              >
                {formik.isSubmitting ? "Please Wait" : "Login"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
