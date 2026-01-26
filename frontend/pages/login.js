import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { logUser } from "../utils/api/auth.api";

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
      const res = await logUser({formData});
       
       console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

     
      localStorage.setItem("token", data.token);

      router.push("/server");

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
}
