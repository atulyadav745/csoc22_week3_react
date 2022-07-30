import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import authRequired from "../middlewares/auth_required";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  authRequired();

  function getTasks() {
    const headersForApiRequest = {
      headers: { Authorization: "Token " + token },
    };
    axios
      .get("/todo/", headersForApiRequest)
      .then(function ({ data, status }) {
        setTasks(data);
      })
      .catch(function (err) {
        console.log("Error");
      });
  }
  useEffect(() => {
    getTasks();
  }, [tasks]);

  return (
    <div>
      <ToastContainer />
      <center>
        <AddTask />
        <ul className="flex-col mt-9 max-w-sm mb-3 ">
          <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
            Available Tasks
          </span>
          <div>
            {tasks.length === 0
              ? "Todo List is Empty"
              : tasks.map((task) => {
                  return (
                    <TodoListItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                    />
                  );
                })}
          </div>
        </ul>
      </center>
    </div>
  );
}
