import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import no_authRequired from "../middlewares/no_auth_required";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const { setToken } = useAuth();
  const router = useRouter();

  no_authRequired();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const loginFieldsAreValid = (username, password) => {
    if (username === "" || password === "") {
      toast.warn("Please fill all the fields correctly....", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };
  const login = () => {
    if (loginFieldsAreValid(username, password)) {
      console.log("Please wait...");

      const dataForApiRequest = {
        username: username,
        password: password,
      };

      axios
        .post("auth/login/", dataForApiRequest)
        .then(function ({ data, status }) {
          setToken(data.token);
          toast.success("Logged in Successfully....", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => router.reload(), 2000);
        })
        .catch(function (err) {
          toast.error("Incorrect Username or Password,Try again ....", {
            position: "top-center",
          });
        });
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center"> Login</h1>
          <ToastContainer />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputUsername"
            id="inputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
