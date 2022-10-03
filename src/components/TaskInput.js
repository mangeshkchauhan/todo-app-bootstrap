import React, { useState, useEffect } from "react";

const getLocalStorage = () => {
  let task = localStorage.getItem("taskList");
  if (task) {
    return JSON.parse(task);
  } else {
    return [];
  }
};

const TaskInput = () => {
  const [inputData, setInputData] = useState("");
  const [tasks, setTask] = useState(getLocalStorage);
  const [editTask, setEditTask] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);

  const addItem = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!inputData) {
      alert("No tasks to add");
    } else if (inputData && !toggleSubmit) {
      setTask(
        tasks.map((elem) => {
          if (elem.id === editTask) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditTask(null);
    } else {
      const allInput = { id: new Date().getTime().toString(), name: inputData };
      setTask([...tasks, allInput]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    let newEditItem = tasks.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditTask(id);
  };

  const deleteItem = (id) => {
    if (id) {
      const updatedItems = tasks.filter((curr) => !(curr.id === id));
      setTask([...updatedItems]);
      setToggleSubmit(true);
      setInputData("");
    }
  };

  const deleteAll = () => {
    setTask([]);
  };

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between m-3">
          <h2> ToDoo React App</h2>
        </div>
      </div>
      <form className="m-4">
        <div className="mb-3">
          <label className="form-label">Task Entry</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the task"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
        {toggleSubmit ? (
          <button className="btn btn-primary" onClick={(e) => addItem(e)}>
            Add Task
          </button>
        ) : (
          <button className="btn btn-primary" onClick={(e) => addItem(e)}>
            Save
          </button>
        )}
      </form>
      {tasks.map((curr) => {
        return (
          <div className="input-group p-4" key={curr.id}>
            <input
              readOnly
              type="text"
              className="form-control"
              value={curr.name}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={(e) => editItem(curr.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => deleteItem(curr.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div className="d-grid gap-2 col-2 mx-auto">
        <button
          type="button"
          className="btn btn-danger m-30"
          onClick={deleteAll}
        >
          Delete All
        </button>
      </div>
    </>
  );
};

export default TaskInput;