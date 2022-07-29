/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoListItem(props) {
  const { token } = useAuth();

  const [updatetask, setUpdatetask] = useState("");
  const editTask = (id) => {
    document.getElementById("input-button-" + id).classList.remove("hideme");
    document.getElementById("done-button-" + id).classList.remove("hideme");
    document.getElementById("task-" + id).classList.add("hideme");
    document.getElementById("task-actions-" + id).classList.add("hideme");
  };

  const deleteTask = (id) => {
    console.log("Please wait...");

    const headersForApiRequest = {
      headers: { Authorization: "Token " + token },
    };

    axios
      .delete("todo/" + id + "/", headersForApiRequest)
      .then(function ({ data, status }) {
        toast.success("Task deleted successfully...", {
          position: "bottom-left",
        });
        console.log();
        // getTasks();
      })
      .catch(function (err) {
        toast.error(
          "Unable to Delete the given task.<br> Please try again...",
          { position: "bottom-left" }
        );
      });
  };

  const updateTask = (id) => {
    if (updatetask === "") {
      toast.warn("Enter a Task...", { position: "bottom-left" });
      return;
    }
    const dataForApiRequest = {
      title: updatetask,
    };

    const headersForApiRequest = {
      headers: { Authorization: "Token " + token },
    };
    axios
      .patch("todo/" + id + "/", dataForApiRequest, headersForApiRequest)
      .then(function ({ data, status }) {
        document.getElementById("input-button-" + id).classList.add("hideme");
        document.getElementById("done-button-" + id).classList.add("hideme");
        document.getElementById("task-" + id).classList.remove("hideme");
        document
          .getElementById("task-actions-" + id)
          .classList.remove("hideme");
        toast.success("Item updated  successfully...  ", {
          position: "bottom-left",
        });
        // console.log();
      })
      .catch(function (err) {
        console.log(
          "Unable to Update the item in todo.<br> Please try again..."
        );
      });
  };

  return (
    <>
      <ToastContainer />
      <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2 ">
        <input
          id={`input-button-${props.id}`}
          type="text"
          className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
          value={updatetask}
          onChange={(e) => setUpdatetask(e.target.value)}
        />
        <div id={`done-button-${props.id}`} className="hideme">
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.id}`} className="todo-task  text-gray-600">
          {props.title}
        </div>
        <span id={`task-actions-${props.id}`} className="">
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => editTask(props.id)}
            className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
              width="18px"
              height="20px"
              alt="Edit"
            />
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
            onClick={() => deleteTask(props.id)}
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
              width="18px"
              height="22px"
              alt="Delete"
            />
          </button>
        </span>
      </li>
    </>
  );
}
