import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import styles from "./CreateTaskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../reducers/taskReducer";

const CreateTaskForm = () => {
  const { userList: users } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const startDate = watch("startDate");

  const onSubmit = async (data) => {
    const { userId } = data;
    const newTask = { ...data, userId: +userId };
    await dispatch(createTask(newTask));
    toast.success("Task created successfully!");
    reset();
  };

  return (
    <div className={styles.container}>
      <Toaster />

      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Tittle</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="userId">User</label>
          <select
            id="userId"
            {...register("userId", { required: "User is required" })}
          >
            <option value="">Select User</option>
            {users.map((user) => {
              return <option value={user.id}>{user.name}</option>;
            })}
          </select>
          {errors.user && <p className={styles.error}>{errors.user.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            {...register("startDate", { required: "Start Date is required" })}
          />
          {errors.startDate && (
            <p className={styles.error}>{errors.startDate.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="dueDate">due Date</label>
          <input
            type="date"
            id="dueDate"
            {...register("dueDate", {
              required: "due Date is required",
              validate: (value) =>
                new Date(value) > new Date(startDate) ||
                "due Date must be after Start Date",
            })}
          />
          {errors.dueDate && (
            <p className={styles.error}>{errors.dueDate.message}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
