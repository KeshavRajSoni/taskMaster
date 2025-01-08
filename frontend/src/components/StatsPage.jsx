import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./StatsPage.module.css";
import { useSelector } from "react-redux";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const StatsPage = () => {
  const { taskList } = useSelector((store) => store.task);
  const { statics } = useSelector((store) => store.task);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    TaskCompletedToday: 0,
  });

  useEffect(() => {
    //update the date
    setStats((prevState) => ({
      ...prevState,
      totalTasks: statics?.totalTasks,
      completedTasks: statics?.completedTasks,
      pendingTasks: statics?.pendingTasks,
      overdueTasks: statics?.overDueTasks,
      TaskCompletedToday: statics?.tasksCompletedToday,
    }));
  }, [taskList, statics]);

  const pieData = {
    labels: [
      "Total Tasks",
      "Completed Tasks",
      "Pending Tasks",
      "Overdue Tasks",
      "Completed Today",
    ],
    datasets: [
      {
        data: [
          stats.totalTasks,
          stats.completedTasks,
          stats.pendingTasks,
          stats.overdueTasks,
          stats.TaskCompletedToday,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(136, 109, 96, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(156, 130, 118, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>Task Statistics</h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks}</p>
        </div>
        <div className={styles.stat}>
          <h3>Completed Tasks</h3>
          <p>{stats.completedTasks}</p>
        </div>
        <div className={styles.stat}>
          <h3>Pending Tasks</h3>
          <p>{stats.pendingTasks}</p>
        </div>
        <div className={styles.stat}>
          <h3>Overdue Tasks</h3>
          <p>{stats.overdueTasks}</p>
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h3>Task Distribution</h3>

          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
