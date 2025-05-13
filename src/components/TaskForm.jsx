import React, { useState, useId } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const inputId = useId();
  const { addTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask(taskName);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
