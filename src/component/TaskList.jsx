import { React, useState } from "react";

const TaskList = ({ t, index }) => {
  const baseURL = import.meta.env.VITE_SOME_baseURL;

  // delete task
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/task/deletetask/${t._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("taskmanageruser")).token,
      },
    });
    const data = await response.json();
    if (data.task) {
      alert("Task deleted successfully");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  const formattedDate = new Date(t.duedate).toISOString().split("T")[0];
  const [title, setTitle] = useState(t.title);
  const [description, setDescription] = useState(t.description);
  const [status, setStatus] = useState(t.status);
  const [duedate, setDueDate] = useState(formattedDate);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    console.log(title, description, status, duedate);

    const response = await fetch(`${baseURL}/api/task/updatetask/${t._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("taskmanageruser")).token,
      },
      body: JSON.stringify({ title, description, duedate, status }),
    });
    const data = await response.json();
    if (data.task) {
      alert("Task updated successfully");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <tr key={t._id}>
      <td>{index + 1}</td>
      <td>{t.title}</td>
      <td className="whitespace-normal break-words max-w-xs">{t.description}</td>
      <td className="text-right">
        <div className="flex justify-end gap-2">
          <span className="badge badge-outline mr-4">{t.status}</span>

          {/* Edit Task Button */}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              document.getElementById(`modal-${t._id}`).showModal();
              setTitle(t.title);
              setDescription(t.description);
              setStatus(t.status);
              setDueDate(formattedDate);
            }}
          >
            Edit Task
          </button>

          {/* Unique Modal per Task */}
          <dialog id={`modal-${t._id}`} className="modal">
            <div className="modal-box">
              <fieldset className="fieldset rounded-box w-auto p-4">
                <label className="label">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  placeholder="Description"
                />

                <label className="label">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <label className="label">Due Date</label>
                <input
                  id="duedate"
                  name="duedate"
                  type="date"
                  required
                  value={duedate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Due Date"
                />
              </fieldset>

              <div className="modal-action">
                <button onClick={handleUpdateTask} className="btn btn-primary">
                  Update Task
                </button>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/* Delete Button */}
          <button onClick={handleDelete} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskList;
