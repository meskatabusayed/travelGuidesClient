/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  oldPassword: "",
  password: "",
};
type FormValues = typeof initialValues;
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("* Old password is required"),
  password: Yup.string()
    .min(6, "Password should atleast 6 character")
    .notOneOf(
      [Yup.ref("oldPassword"), undefined],
      "* Your new password shouldn't match with old password"
    )
    .required("* New password is required"),
});

const UpdatePassword = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (values: FormValues) => {
    const toastId = toast.loading("Please wait");

    try {
      const data = await resetPassword(values);
      const error: any = data.error;

      console.log(error);

      if (error) {
        if (error.status === 403) {
          return toast.error("password didn;t matched", {
            description: "try to remember your password and try again",
          });
        }

        return toast.error(error.data?.message || "Unknown error occureds");
      }

      toast.success("Passworrd updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating your details");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">
    Update your login credentials
  </h1>
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isValid }) => (
      <Form className="space-y-5">
        
        <div className="mb-4">
          <Label htmlFor="oldPassword" className="text-gray-700 font-medium">Current password *</Label>
          <Field
            as={Input}
            placeholder="Enter your current password"
            type="password"
            name="oldPassword"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 transition-all"
          />
          <ErrorMessage
            name="oldPassword"
            component="div"
            className="text-red-500 text-sm mt-2"
          />
        </div>

        
        <div className="mb-4">
          <Label htmlFor="password" className="text-gray-700 font-medium">New password *</Label>
          <Field
            type="password"
            as={Input}
            placeholder="Enter your new password"
            name="password"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 transition-all"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-2"
          />
        </div>

       
        <Button
          type="submit"
          disabled={!isValid}
          className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>
</div>

  );
};

export default UpdatePassword;