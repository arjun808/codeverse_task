import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { AddNewUserSchema } from "../../schemas/AddNewUserSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

function AddNewUser({ setIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
    },
    resolver: yupResolver(AddNewUserSchema()),
  });
  const { mutate, reset } = useMutation({
    mutationFn: async (data) =>
      await axios.post("https://dummyjson.com/users/add", {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
      }),
    onSuccess: () => {
      toast.success("user added successfully");
      setIsOpen(false);
      reset();
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label>First Name:</label>
          <input
            className="border rounded-lg p-1"
            placeholder="first Name"
            {...register("firstName")}
          ></input>
          {errors.firstName && (
            <p className="text-red-800">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Last Name:</label>
          <input
            className="border rounded-lg p-1"
            placeholder="Last Name"
            {...register("lastName")}
          ></input>
          {errors.lastName && (
            <p className="text-red-800">{errors.lastName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Age:</label>
          <input
            className="border rounded-lg p-1"
            placeholder="Age"
            {...register("age")}
          ></input>
          {errors.age && <p className="text-red-800">{errors.age.message}</p>}
        </div>
        <button
          disabled={!isValid}
          className={`${
            !isValid ? "bg-blue-300" : "bg-blue-600 "
          }  rounded-2xl cursor-pointer`}
        >
          Add User{" "}
        </button>
      </form>
    </div>
  );
}

export default AddNewUser;
