// Form.js
import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted successfully!", data);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Form Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div>
          <label className="form-label">Username:</label>
          <input
            className="form-input"
            type="text"
            name="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="form-label">Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === document.getElementsByName("password")[0].value ||
                "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
