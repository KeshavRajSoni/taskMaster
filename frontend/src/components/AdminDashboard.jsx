import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { logOut } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats, fetchTasks } from "../reducers/taskReducer";
import TaskList from "./TaskList";
import { fetchUsers } from "../reducers/userReducer";
import CreateTaskForm from "./CreateTaskForm";
import StatsPage from "./StatsPage";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Stats");
  const dispatch = useDispatch();
  const { name: myName } = useSelector((store) => store.auth);

  useEffect(
    function () {
      dispatch(fetchTasks(1));
    },
    [dispatch]
  );
  useEffect(
    function () {
      dispatch(fetchStats());
    },
    [dispatch]
  );
  useEffect(
    function () {
      dispatch(fetchUsers());
    },
    [dispatch]
  );

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className="sidebartop">
          <h1>Hello {myName}</h1>
          <ul>
            <li onClick={() => setActiveTab("Stats")}>Stats</li>
            <li onClick={() => setActiveTab("Task List")}>Task List</li>
            <li onClick={() => setActiveTab("Create Task")}>Create Task</li>
          </ul>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === "Stats" && <StatsPage />}
        {activeTab === "Task List" && <TaskList />}
        {activeTab === "Create Task" && <CreateTaskForm />}
      </div>
    </div>
  );
};

export default AdminDashboard;
