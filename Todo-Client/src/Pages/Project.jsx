import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { projectAdd, userProject, deleteProject } from "../services/allApis";


function Project() {
  const [logStatus, setLogStatus] = useState(false);
  const [data, setData] = useState({
    userId: "",
    project: "",
  });
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  var username = sessionStorage.getItem("username");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
      var userId = sessionStorage.getItem("userId");
      setData({ userId: userId });
      getProject();
    } else {
      setLogStatus(false);
    }
  }, [logStatus]);

  // Adding project to database
  const addProject = async () => {
    const { userId, project } = data;
    if (!userId) {
      toast.warning("Login for add projects");
      navigate("/login");
    } else if (!project) {
      toast.warning("Enter project name");
    } else {
      const result = await projectAdd(data);
      if (result.status == 200) {
        toast.success("project added");
        setData({ userId: "", project: "" });
        window.location.reload();
      } else {
        toast.error(result.response.data);
      }
    }
  };
 
  // Getting project from Database
  const getProject = async () => {
    const { userId } = data;
    if (userId) {
      const res = await userProject(data);
      setProjects(res.data);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };


  const viewProject = (id, project) => {
    sessionStorage.setItem("projectId", id);
    sessionStorage.setItem("project", project);
    navigate(`/todo/${id}`);
  };

  const ProjectSummary = (id, project) => {
    sessionStorage.setItem("projectId", id);
    sessionStorage.setItem("project", project);
    navigate(`/project-summary/${id}`);
  };

  //Deleting project from database
  const delProject = async (id) => {
    const data = {
      id: id,
    };
    const res = await deleteProject(data);
    console.log(res);
    if (res.status == 200) {
      toast.success("Todo deleted");
    }
    window.location.reload();
  };

  return (
    <>
      <div
        className="w-100  justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>
          {username ? <h3 className="ms-3">Hi {username}</h3> : ""}
          {username ? (
            <button className="btn btn-danger me-4" onClick={logout}>
              Logout
            </button>
          ) : (
            <a className="btn btn-danger me-4" href="/login">
              Login
            </a>
          )}
        </div>

        <div className="w-100 d-flex justify-content-center align-items-center">
          <FloatingLabel controlId="floatingProject" label="Enter Project name">
            <Form.Control
              type="text"
              placeholder="Enter Project name"
              onChange={(e) => {
                setData({ ...data, project: e.target.value });
              }}
            />
          </FloatingLabel>
          <button className="btn btn-primary m-3" onClick={addProject}>
            Add Project
          </button>
        </div>
        {projects.length > 0 ? (
          projects.map((item) => (
            <div className="d-flex justify-content-between border shadow p-3 mb-3">
              <h3>{item.project}</h3>
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    viewProject(item._id, item.project);
                  }}
                >
                  View Project
                </button>
                <button
                  className="btn btn-info m-2"
                  onClick={() => {
                    ProjectSummary(item._id,item.project);
                  }}
                >
                  Project Summary
                </button>

                <button
                  className="btn ms-2 btn-danger"
                  onClick={() => {
                    delProject(item._id);
                  }}
                >
                  <i className="fa-solid fa-trash fa-2xl"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No projects</h3>
        )}
      </div>
    </>
  );
}

export default Project;
