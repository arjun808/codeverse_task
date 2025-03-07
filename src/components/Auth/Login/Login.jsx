import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../schemas/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { user, loginWithRedirect } = useAuth0();
  console.log(user, "dekh");
  useEffect(() => {
    if (cookies.accessToken) {
      navigate("/admin-dashboard", { replace: true });
    } else {
      setIsCheckingAuth(false);
    }
  }, [cookies, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: data.userName,
          password: data.password,
          expiresInMins: 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: (data) => {
      setCookie("accessToken", data.data.accessToken, { path: "/" });
      navigate("/admin-dashboard", { replace: true });
      toast.success("Login Successful");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onFormSubmit = (data) => {
    mutate(data);
  };

  if (isCheckingAuth) {
    return null;
  }
  const handleGoogleSignIn = async () => {
    await loginWithRedirect();
  };
  return (
    <div className="w-full h-svh flex flex-col items-center justify-center bg-black">
      <h1 className="text-white mb-4 text-4xl font-bold shadow-amber-300">
        Login
      </h1>
      <div className="h-1/3 w-1/3 border-5 border-amber-600 rounded-2xl flex p-10 items-center bg-white justify-center">
        <form
          className="flex flex-col gap-2 w-2/3"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex flex-col">
            <label>UserName:</label>
            <input
              {...register("userName")}
              className="border rounded-lg p-1"
              placeholder="name"
            />
            {errors.userName && (
              <p className="text-red-900 h-auto">{errors.userName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Password:</label>
            <input
              {...register("password")}
              type="password"
              className="border rounded-lg p-1"
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-900 h-5">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full bg-blue-800 hover:opacity-80 cursor-pointer text-white p-1 rounded-2xl mt-4"
            disabled={isPending}
          >
            {isPending ? "Processing" : "Login"}
          </button>
          <p>or</p>
          <button type="button" onClick={handleGoogleSignIn}>
            Google
          </button>
          ;
        </form>
      </div>
    </div>
  );
}

export default Login;
