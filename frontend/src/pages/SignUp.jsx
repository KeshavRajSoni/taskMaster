//packages
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
//other
import styles from "./SignUp.module.css";
import { signUpReducer, updateError } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  let { isAuthenticated, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (status === "succeeded") navigate("/login");
      if (error === "UniqueViolationError") {
        toast.error("Username already in use");
        dispatch(updateError(null));
      }
    },
    [isAuthenticated, status, navigate, error]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, password, role } = data;
    await dispatch(signUpReducer({ name, password, role }));
    // toast("hello");
    if (status === "succeeded") {
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className={styles.input}
            />
            {errors.name && (
              <span className={styles.error}>name is required</span>
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
          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className={styles.input}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && (
              <span className={styles.error}>Role is required</span>
            )}
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={status === "loading"}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
