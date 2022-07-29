import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTask(props) {
  const { token } = useAuth();
  const [addtask, setAddtask] = useState("");

  const addTaskFieldsAreValid = (addtask) => {
    if (addtask === "") {
      toast.warn("Please fill a Task....", { position: "top-center" });
      return false;
    }
    return true;
  };
  const addTask = () => {
    if (addTaskFieldsAreValid(addtask)) {
      toast.info("Please wait...", { position: "top-center", autoClose: 1000 });

      const dataForApiRequest = {
        title: addtask,
      };

      const headersForApiRequest = {
        headers: { Authorization: "Token " + token },
      };

      axios
        .post("/todo/create/", dataForApiRequest, headersForApiRequest)
        .then(function ({ data, status }) {
          setAddtask("");
          toast.success("Task Added in the Todo Succesfully....", {
            position: "top-center",
          });
        })
        .catch(function (err) {
          toast.error("Task Not Added in the Todo ....", {
            position: "top-center",
          });
        });
    }
  };
  return (
    <div className="flex items-center max-w-sm mt-24">
      <ToastContainer />
      <input
        type="text"
        className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        placeholder="Enter Task"
        name="addTask"
        id="addTask"
        value={addtask}
        onChange={(e) => setAddtask(e.target.value)}
      />
      <button
        type="button"
        className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}
