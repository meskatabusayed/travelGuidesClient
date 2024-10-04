/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});

const Login = () => {
  const [login] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const redirect = Cookies.get("redirect");

  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data, error: err } = await login(values);
      const error: any = err;
      if (error) {
        if (error.status === 401) {
          return toast.error("password didn;t matched", {
            description: "try to remember your password and try again",
          });
        }
        if (error.status === 404) {
          return toast.error("Invalid email address", {
            description: "Enter a valid email adress.",
          });
        }

        return toast.error(error.data?.message || "Unknown error occureds");
      }

      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }

      const authData = {
        user: data.data,
      };
      dispatch(setUser(authData));
      Cookies.set("refreshToken", data.refreshToken, { expires: 30 });
      dispatch(setToken(data.accessToken || ""));

      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });

      redirect ? Cookies.remove("redirect") : "";
      router.replace(redirect || "/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen lg:mt-[62px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
  <div className="flex flex-col items-center justify-center gap-[30px] p-8 lg:p-12 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-70 bg-white max-w-md w-full mx-4">
    <h2 className="font-extrabold text-center text-[36px] text-gray-800 mb-8">
      Login to Your Account
    </h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 w-full">
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-[20px] py-[12px] bg-purple-600 text-white font-bold hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Login <LogIn className="inline-block ml-2" />
          </button>
        </Form>
      )}
    </Formik>
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        New user?{" "}
        <Link
          href="/register"
          className="text-purple-600 font-semibold hover:underline"
        >
          Sign Up here
        </Link>
      </p>
    </div>
  </div>
</div>

  
    
  );
};

export default Login;