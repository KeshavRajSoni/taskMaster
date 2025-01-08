import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard");
    },
    [isAuthenticated, navigate]
  );

  function handleClickSignUp() {
    navigate("/signup");
  }
  function handleClickLogin() {
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Task Management</h1>
        <p className={styles.text}>
          Welcome to our task management platform. Organize your tasks
          efficiently and boost your productivity.
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.signUp}`}
            onClick={handleClickSignUp}
          >
            Sign Up
          </button>
          <button
            onClick={handleClickLogin}
            className={`${styles.button} ${styles.login}`}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
