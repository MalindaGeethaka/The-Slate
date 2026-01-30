import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { logUser } from "../utils/api/auth.api";
import {jwtDecode} from "jwt-decode";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await logUser({ formData });
    const token = res.token;

    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("auth-change"));

    const decoded = jwtDecode(token);

    if (decoded.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  } catch (error) {
    alert("Login failed");
  };


    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.p}>E Mail</p>
        <input
          type="string"
          name="email"
          placeholder="Type your E Mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <p className={styles.p}>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Type your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Logging in..." : "Login"} 
        </button>
      </form>
    </div>
  );
};