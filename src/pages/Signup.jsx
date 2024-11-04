import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import styles from "./Signup.module.css";
import { supabase } from "@/main";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (formData, e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setSignupError(error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("회원 가입 중 오류 발생:", error.message);
      setSignupError(error.message);
    }
  };

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이메일:</label>
          <input
            type="text"
            className={styles.input}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
              minLength: {
                value: 6,
                message: "이메일은 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.email && (
            <p className={`${styles.error} ${errors.email ? styles.show : ""}`}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
              })}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className={styles.toggleButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p
              className={`${styles.error} ${
                errors.password ? styles.show : ""
              }`}
            >
              {errors.password.message}
            </p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호 확인:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              {...register("confirmPassword", {
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 동일하지 않습니다.",
              })}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className={styles.toggleButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              className={`${styles.error} ${
                errors.confirmPassword ? styles.show : ""
              }`}
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {signupError && (
          <p className={`${styles.error} ${signupError ? styles.show : ""}`}>
            {signupError}
          </p>
        )}
        <button type="submit" className={styles.submitButton}>
          가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
