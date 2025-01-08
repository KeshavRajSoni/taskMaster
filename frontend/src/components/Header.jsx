import React from "react";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = ({ filters, setFilters }) => {
  const { userList: users } = useSelector((store) => store.user);
  let filteredUsers = users.filter((user) => user.role === "user");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.header}>
      <h1>Task List</h1>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="user">User:</label>
          <select
            name="user"
            value={filters.user}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all">All</option>
            {filteredUsers.map((user) => {
              return <option value={user.name}>{user.name}</option>;
            })}
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className={styles.dateInput}
          />
        </div>
        <div className={styles.filter}>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className={styles.dateInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
