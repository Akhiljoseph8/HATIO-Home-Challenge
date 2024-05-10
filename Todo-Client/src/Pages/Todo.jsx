import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { todoAdd, getTodos, todoUpdate, todoDelete } from "../services/allApis";
import { toast } from "react-toastify";
function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [logStatus, setLogStatus] = useState(false);
  const [data, setData] = useState({
    projectId: "",
    todo: "",
    createdTime: "",
    updateTime: "",
    status: "",
  });

  const projectId = sessionStorage.getItem("projectId");
  const projectName = sessionStorage.getItem("project");

  useEffect(() => {
    getTodo();

    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
      var userId = sessionStorage.getItem("userId");
      setData({ ...data, projectId: id });
    } else {
      setLogStatus(false);
    }
  }, [logStatus]);

  var { id } = useParams();

  // Function to toggle the editable state for a specific row
  const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedTodo(rowData.todo);
      setEditedStatus(rowData.status);
    } else {
      setEditableId(null);
      setEditedTodo("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  // Function to add task to the database
  const addTodo = async (e) => {
    e.preventDefault();
    const { todo, status, createdTime, updateTime, projectId } = data;
    if (!status || !todo) {
      alert("All fields must be filled out.");
      return;
    } else {
      const result = await todoAdd(data);
      console.log(result);
      setTodoList(result.data);
      if (result.status == 200) {
        toast.success("Todo added");
        setData({ todo: "", createdTime: "", updateTime: "", status: "" });
        window.location.reload();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  // Function to get todos from database
  const getTodo = async () => {
    const data = { projectId: projectId };
    if (data) {
      const res = await getTodos(data);
      setTodoList(res.data);
    }
  };

  // Function to save edited data to the database
  const saveEditedTask = async (id) => {
    const editedData = {
      todoId: id,
      todo: editedTodo,
      status: editedStatus,
      updateTime: new Date(),
    };
    console.log(editedData);
    // If the fields are empty
    if (!editedTodo || !editedStatus) {
      alert("All fields must be filled out.");
      return;
    } else {
      const result = await todoUpdate(editedData);
      console.log(result);
      if (result.status == 200) {
        toast.success("Todo updated");
        setEditedTodo("");
        setEditedStatus("");
        window.location.reload();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  // Delete task from database
  const deleteTask = async (id) => {
    const data = {
      id: id,
    };
    const res = await todoDelete(data);
    if (res.status == 200) {
      toast.success("Todo deleted");
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">{projectName}</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Created Time</th>
                  <th>Updated Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {Array.isArray(todoList) ? (
                <tbody>
                  {todoList.map((data) => (
                    <tr key={data._id}>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTodo}
                            onChange={(e) => setEditedTodo(e.target.value)}
                          />
                        ) : (
                          data.todo
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <>
                            <input
                              name="status"
                              type="radio"
                              value="pending"
                              id="pen"
                              onChange={(e) => {
                                setEditedStatus(e.target.value);
                              }}
                            />
                            <label for="pen">Pending</label> <br />
                            <input
                              name="status"
                              type="radio"
                              value="completed"
                              id="com"
                              onChange={(e) => {
                                setEditedStatus(e.target.value);
                              }}
                            />
                            <label for="pen">Completed</label>
                          </>
                        ) : (
                          data.status
                        )}
                      </td>
                      <td>{new Date(data.createdTime).toLocaleString()}</td>
                      {data.updateTime ? (
                        <td>{new Date(data.updateTime).toLocaleString()}</td>
                      ) : (
                        "Not updated"
                      )}

                      <td>
                        {editableId === data._id ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm ml-1"
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4">Loading products...</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="text-center">Add Task</h2>
          <form className="bg-light p-4">
            <div className="mb-3">
              <label>Task</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Task"
                onChange={(e) => {
                  setData({ ...data, todo: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label>Status</label> <br />
              <input
                name="status"
                type="radio"
                value="pending"
                id="pen"
                onChange={(e) => {
                  setData({
                    ...data,
                    status: e.target.value,
                    createdTime: new Date(),
                    projectId: id,
                  });
                }}
              />
              <label for="pen">Pending</label> <br />
              <input
                name="status"
                type="radio"
                value="completed"
                id="com"
                onChange={(e) => {
                  setData({
                    ...data,
                    status: e.target.value,
                    createdTime: new Date(),
                    projectId: id,
                  });
                }}
              />
              <label for="pen">Completed</label>
            </div>
            <button onClick={addTodo} className="btn btn-success btn-sm">
              Add Task
            </button>
          </form>
          <a className="btn btn-primary m-5" href="/">Back to home</a>
        </div>
        
      </div>
    </div>
  );
}
export default Todo;
