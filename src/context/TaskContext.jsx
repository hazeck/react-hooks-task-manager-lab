import React, { createContext, useState, useEffect, useContext } from "react";

export const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend on component mount
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then(setTasks);
  }, []);

  // Add new task to the backend and update local state
  const addTask = (taskName) => {
    if (!taskName.trim()) return; // Prevent empty tasks

    const newTask = { title: taskName.trim(), completed: false };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.title) {
          setTasks((prev) => [...prev, data]); // Add to local state if task is valid
        }
      });
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = { ...task, completed: !task.completed };

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).then(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    });
  };

  // Filter tasks based on search query
  const filteredTasks = (query) =>
    tasks.filter((task) =>
      task.title?.toLowerCase().includes(query.toLowerCase()) // Safe filter
    );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleComplete, filteredTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
