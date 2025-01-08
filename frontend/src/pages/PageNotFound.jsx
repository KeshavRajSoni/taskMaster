import React from "react";
import { useHistory, useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  const history = useNavigate();

  const goToDashboard = () => {
    history("/dashboard");
  };

  return (
    <div className={styles.pageNotFound}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist.
      </p>
      <button className={styles.button} onClick={goToDashboard}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default PageNotFound;
