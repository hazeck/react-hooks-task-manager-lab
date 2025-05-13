import React from "react";
import { useTasks } from "../context/TaskContext";

function TaskList({ query }) {
  const { filteredTasks, toggleComplete } = useTasks();
  const tasks = filteredTasks(query);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>
          <button onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
