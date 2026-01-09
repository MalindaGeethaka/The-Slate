import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

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
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

     
      localStorage.setItem("token", data.token);

      router.push("/");

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.p}>User Name</p>
        <input
          type="string"
          name="username"
          placeholder="Type your User Name"
          value={formData.username}
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
