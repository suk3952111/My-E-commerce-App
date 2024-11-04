import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import styles from "./Signup.module.css"; // 회원가입 페이지와 동일한 CSS 파일 사용
import { supabase } from "@/main";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const [showPassword, toggleShowPassword] = useToggle(false);
  const navigate = useNavigate();

  const onSubmit = async (formData, e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setLoginError(error.message);
      } else {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이메일:</label>
          <input
            type="text"
            className={styles.input}
            {...register("email", {
              required: "Email ID를 입력해주세요",
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
        {loginError && (
          <p className={`${styles.error} ${loginError ? styles.show : ""}`}>
            {loginError}
          </p>
        )}
        <button type="submit" className={styles.submitButton}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
