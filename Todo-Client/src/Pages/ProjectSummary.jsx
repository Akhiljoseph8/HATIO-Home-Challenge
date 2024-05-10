import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodos } from "../services/allApis";

function ProjectSummary() {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [count, setCount] = useState(0);
  var { id } = useParams();
  var project = sessionStorage.getItem("project");
  useEffect(() => {
    getSummary(id);
  }, []);

  var arr = [];

  const getSummary = async (projectId) => {
    const res = await getTodos({ projectId });
    setData(res.data);
    arr = res.data;
    var count = 0;
    setLength(arr.length);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].status == "completed") {
        count++;
        setCount(count);
      }
    }
  };
  return (
    <>
      <h1>{project}</h1>
      <h4>
        Summary: {count}/{length} todos completed
      </h4>
      <h5>Pending</h5>
      {data.map((item) =>
        item.status == "pending" ? (
          <div>
            <input type="checkbox" disabled /> {item.todo}
          </div>
        ) : (
          ""
        )
      )}
      <h5>Competed</h5>

      {data.map((item) =>
        item.status == "completed" ? (
          <div>
            <input type="checkbox" checked disabled /> {item.todo}
          </div>
        ) : (
          ""
        )
      )}
    </>
  );
}

export default ProjectSummary;
