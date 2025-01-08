import React from "react";
import styles from "./Footer.module.css";

const Footer = ({ pageNumber, handleNext, handlePrevious }) => {
  return (
    <div className={styles.footer}>
      <button className={styles.button} onClick={handlePrevious}>
        &lt;
      </button>
      <span className={styles.pageNumber}>Page {pageNumber}</span>
      <button className={styles.button} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Footer;
