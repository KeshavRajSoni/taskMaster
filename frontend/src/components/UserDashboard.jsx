import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../reducers/authReducer";
import { fetchUserTasks, taskDone, taskUndo } from "../reducers/taskReducer";
import Footer from "./Footer";
// import store from "../Store";

const UserDashboard = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const tasksPerPage = 4;
  const startIndex = (pageNumber - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;

  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const { name: myName, id } = useSelector((store) => store.auth);
  const { taskList: tasks } = useSelector((store) => store.task);
  const totalTasks = tasks.length;

  useEffect(
    function () {
      dispatch(fetchUserTasks(id));
    },
    [dispatch]
  );

  function filtertask() {
    if (filter === "all") {
      return tasks;
    } else if (filter === "today") {
      const today = new Date().toLocaleDateString(); // Get today's date in locale-specific format
      return tasks.filter((task) => {
        const startDate = new Date(task.startDate).toLocaleDateString(); // Convert task start date to locale-specific format
        return startDate === today;
      });
    } else {
      return tasks.filter((task) => task.status === filter);
    }
  }

  const filteredTask = filtertask().slice(startIndex, endIndex);

  const handleDoneClick = async (taskId) => {
    await dispatch(taskDone(taskId));
    await dispatch(fetchUserTasks(id));
    // setReRender(reRender * -1);
  };
  const handleUndoClick = async (taskId) => {
    await dispatch(taskUndo(taskId));
    await dispatch(fetchUserTasks(id));

    // setReRender(reRender * -1);
  };
  const handleLogout = (taskId) => {
    dispatch(logOut());
  };
  const handlePrevious = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPageNumber((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(totalTasks / tasksPerPage))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Tasks</h2>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{myName}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? styles.active : ""}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter("today")}
          className={filter === "today" ? styles.active : ""}
        >
          Today's Tasks
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? styles.active : ""}
        >
          Completed Tasks
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? styles.active : ""}
        >
          Pending Tasks
        </button>
      </div>
      <div className={styles.taskList}>
        {filteredTask.map((task) => (
          <div key={task.id} className={styles.task}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Start Date: {task.startDate}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>

            {task.status === "pending" ? (
              <button
                onClick={() => handleDoneClick(task.id)}
                className={styles.doneButton}
              >
                Done
              </button>
            ) : (
              <button
                onClick={() => handleUndoClick(task.id)}
                className={styles.undoButton}
              >
                Undo
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer
        pageNumber={pageNumber}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default UserDashboard;
