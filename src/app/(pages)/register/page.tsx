"use client";

import { useRegisterCustomerMutation } from "@/redux/features/auth/auth.api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  firstName: Yup.string().required("* firstName is required"),
  lastName: Yup.string().required("* lastName is required"),
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "* Passwords must match")
    .required("* Confirm password is required"),
});
const CreateAccount = () => {
  const [register] = useRegisterCustomerMutation();

  const router = useRouter();

  const handleRegister = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await register(values);
      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }
      toast.success("Successfully registered", {
        description: "Now please login",
      });
      router.push("/login");
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
      Create an Account
    </h2>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
      {({ isSubmitting }) => (
        <Form className="space-y-6 w-full">
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Your First Name
            </label>
            <Field
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Your Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email address"
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
              placeholder="Enter your password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-[18px] font-semibold mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ease-in-out"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-[20px] py-[15px] bg-purple-600 text-white font-bold hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
    <div className="mt-8 text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-600 font-semibold hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default CreateAccount;
