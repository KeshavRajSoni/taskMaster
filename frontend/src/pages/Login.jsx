//packages
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//other
import styles from "./Login.module.css";
import { logInReducer, updateError } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard");
      if (error === "failed") {
        toast.error("please enter correct credentials");
        dispatch(updateError(null));
      }
    },
    [isAuthenticated, status, navigate]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username: name, password, role } = data;
    await dispatch(logInReducer({ name, password, role }));
  };

  return (
    <>
      <Toaster></Toaster>
      <div className={styles.container}>
        <h2 className={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className={styles.input}
            />
            {errors.username && (
              <span className={styles.error}>Username is required</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className={styles.input}
            />
            {errors.password && (
              <span className={styles.error}>Password is required</span>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
