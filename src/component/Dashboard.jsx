import { React, useEffect ,useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("taskmanageruser");
  const [title, setTitle] = useState("");
  const [description, setDescription] =useState("");
  const [status, setStatus] = useState("");
  const [duedate, setDueDate] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("user is null");
      navigate("/");
    }
    getAllTask();
  }, [user, navigate]);

//   const task = [
//     {
//       id: 1,
//       title: "Task 1",
//       description:
//         "Description for Task dasdasdasdasdasdasdasdbajdvadahsdaj dagd jadagdasdhajs dakdhadakdhadhasjshdkahsdhajkdhjdhakjdhjahdjkahsdjhakjsdhjkashdhaj hdha jhdhjah dhah kd ad aa loremsadasd asadsadasdasdas1",
//       status: "In Progress",
//     },
//     {
//       id: 2,
//       title: "Task 2",
//       description: "Description for Task 2",
//       status: "Completed",
//     },
//     {
//       id: 3,
//       title: "Task 3",
//       description: "Description for Task 3",
//       status: "Not Started",
//     },
//     {
//       id: 4,
//       title: "Task 4",
//       description: "Description for Task 4",
//       status: "In Progress",
//     },
//     {
//       id: 5,
//       title: "Task 5",
//       description: "Description for Task 5",
//       status: "Completed",
//     },
//   ];

  const baseURL = import.meta.env.VITE_SOME_baseURL;
  // get all task

  const getAllTask = async () => {
    const response = await fetch(`${baseURL}/api/task/getalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(user).token,
      },
    });
    const data = await response.json();
    if (data.tasks) {
      console.log(data);
      setTask(data.tasks);
    } else {
      alert(data.error);
    }
  };
 

  // add tast

    const handleAddtask = async (e) => {
      e.preventDefault();
      const response = await fetch(`${baseURL}/api/task/createtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(user).token,
        },
        body: JSON.stringify({ title, description, status, duedate }),
      });
      const data = await response.json();
      if (data.task) {
        alert("Task added successfully");
        window.location.reload();
      } else {
        alert(data.error);
      }
    }
   


  return (
    <>
      <Navbar />
      {/* add task */}
      <div className="flex justify-center items-center my-6">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Task
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Task</h3>
            <fieldset className="fieldset rounded-box w-auto p-4">

            <label className="label">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Title"
            />
            <label className="label">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Description"
            />

            <label className="label">DueDate</label>
            <input
              id="duedate"
              name="duedate"
              type="date"
              required
              value={duedate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input"
              placeholder="duedate"
            />
            </fieldset>

            

            <div className="modal-action">
              <button onClick={handleAddtask} className="btn btn-primary">Add task</button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {task.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No tasks available</h1>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table w-100%">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {task.map((t , index) => (
                <TaskList t={t} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Dashboard;
