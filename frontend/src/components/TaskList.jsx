import React, { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTaskReducer,
} from "../reducers/taskReducer";
import Header from "./Header";
import Footer from "./Footer";

const TaskList = () => {
  //states

  //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const { taskList: tasks } = useSelector((store) => store.task);
  const [updateTask, setUpdateTask] = useState(0);
  const [filters, setFilters] = useState({
    user: "all",
    status: "all",
    startDate: "2023-01-01",
    endDate: "2026-01-01",
  });
  const [newTask, setNewTask] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    status: "",
    userName: "",
  });
  const dispatch = useDispatch();

  //useEffects

  //other variables

  //fucntions
  const handleDoneEdit = async () => {
    await dispatch(updateTaskReducer(newTask));
    await dispatch(fetchTasks());
    setUpdateTask(0);
  };
  const handleCancleEdit = () => {
    setUpdateTask(0);
  };

  const handleDelete = async (taskId) => {
    var confirmation = window.confirm("Press OK to delete, or Cancel to keep.");
    if (confirmation) {
      await dispatch(deleteTask(taskId));
      await dispatch(fetchTasks());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (
    taskId,
    {
      taskName,
      taskDescription,
      taskStartDate,
      taskDueDate,
      taskStatus,
      taskUserName,
    }
  ) => {
    setNewTask((prevState) => ({
      ...prevState,
      id: taskId,
      name: taskName,
      description: taskDescription,
      startDate: taskStartDate,
      dueDate: taskDueDate,
      status: taskStatus,
      userName: taskUserName,
    }));
    setUpdateTask(taskId);
  };
  const filterTasks = () => {
    return tasks.filter((task) => {
      const userMatch =
        filters.user === "all" || task.userName === filters.user;

      const statusMatch =
        filters.status === "all" || task.status === filters.status;

      const startDateMatch =
        new Date(task.startDate) >= new Date(filters.startDate);

      const endDateMatch = new Date(task.dueDate) <= new Date(filters.endDate);

      return userMatch && statusMatch && startDateMatch && endDateMatch;
    });
  };

  const handleNext = () => {
    setPageNumber((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(tasks.length / 5))
    );
  };
  const handlePrevious = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };
  //   other initail work
  const filteredTasks = filterTasks();

  useEffect(
    function () {
      dispatch(fetchTasks(pageNumber));
    },
    [pageNumber, dispatch]
  );

  return (
    <div className={styles.container}>
      <Header filters={filters} setFilters={setFilters} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>User Name</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) =>
            task.id === updateTask ? (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="startDate"
                    value={newTask.startDate}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="dueDate"
                    defaultValue="2024-06-12"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="userName"
                    value={newTask.userName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </td>
                <td>
                  <button
                    className={styles.doneButton}
                    onClick={handleDoneEdit}
                  >
                    Done
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={handleCancleEdit}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.startDate}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>{task.userName}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() =>
                      handleEdit(task.id, {
                        taskName: task.name,
                        taskDescription: task.description,
                        taskStartDate: task.startDate,
                        taskDueDate: task.dueDate,
                        taskStatus: task.status,
                        taskUserName: task.userName,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Footer
        pageNumber={pageNumber}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default TaskList;
