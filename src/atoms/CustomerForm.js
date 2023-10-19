// Form.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]*$/, "First name must not contain special characters")
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]*$/, "Last name must not contain special characters")
    .required(),
  email: yup.string().email("Invalid email format").required(),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required(),
});
const enforceNumericInput = (value) => {
  return value.replace(/\D/g, "").slice(0, 10); // Allow only digits and limit to 10 characters
};
const CustomerForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [showSuccess, setShowSuccess] = useState(false); // State for showing success message

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setShowSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-10"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            Your form has been submitted successfully.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowSuccess(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 mb-10 dark:text-white">
          Add Customers
        </h2>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              {...register("firstName")}
              type="text"
              placeholder=" "
              id="firstName"
              name="firstName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          )}
        />
        <label
          htmlFor="firstName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          First Name
        </label>
        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.firstName?.message}
        </p>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              {...register("lastName")}
              type="text"
              placeholder=" "
              id="lastName"
              name="lastName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          )}
        />
        <label
          htmlFor="lastName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Last Name
        </label>
        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.lastName?.message}
        </p>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              {...register("email")}
              type="email"
              placeholder=" "
              id="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          )}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.email?.message}
        </p>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              {...register("phone")}
              type="text"
              placeholder=" "
              id="phone"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onInput={(e) =>
                (e.target.value = enforceNumericInput(e.target.value))
              }
            />
          )}
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
        <p class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.phone?.message}
        </p>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
