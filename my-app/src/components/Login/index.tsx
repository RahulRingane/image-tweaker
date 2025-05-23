import useForm from "useeform";
import axios from "axios";
import { z } from "zod";
import { BACKEND_API_BASE_URL } from "../../config";
import Loader from "../../assets/Loader";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export default function Signup() {

    const navigate = useNavigate();

  const formSchemaZod = {
    username: z.string().min(1),
    password: z.string().min(8),
  };
  const { formUI } = useForm({
    name: "test",
    className:
      "inline-flex flex-col justify-center items-center space-y-4 w-full bg-transparent w-full",
    onSubmit: async (event, values, errors, zodErrors) => {
      event.preventDefault();
      if (zodErrors.length != 0 || errors.length != 0)
        return console.error(zodErrors, errors);

      toast.promise(
        axios.post(BACKEND_API_BASE_URL + "/api/auth/login", values, {
          withCredentials: true,
        }),
        {
          loading: "Logging in...",
          success: () => {
            navigate("/dashboard");
            return "Logged in successfully";
          },
          error: (err) => {
            if (err.response.data.message) return err.response.data.message;
            return "Internal Server Error";
          },
        },
        {
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }
      );
    },
    children: [
      {
        formElement: "label",
        name: "label-username",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Username",
        children: {
          formElement: "input",
          type: "text",
          name: "username",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.username,
          required: true,
          value: "pulkit12",
        },
      },
      {
        formElement: "label",
        name: "label-password",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Password",
        children: {
          formElement: "input",
          type: "password",
          name: "password",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.password,
          required: true,
          value: "pulkit12",
        },
      },
      {
        formElement: "button",
        type: "submit",
        name: "submit",
        loading: true,
        loadingComponent: <Loader />,
        className:
          "w-full bg-black text-white p-2 rounded-md hover:bg-gray-800",
        value: "Log In",
        autoFocus: false,
        disabled: false,
      },
    ],
  });
  return <Layout formUI={formUI} />;
}