import { useState } from "react";
import styles from ".././../styles/Register.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // 🔐 Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setStrength("Weak");
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/)
    ) {
      setStrength("Strong");
    } else {
      setStrength("Medium");
    }
  };

  // ✅ Form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/client/login");
    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className={styles.registerPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        {errors.name && <small>{errors.name}</small>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <small>{errors.email}</small>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {strength && (
          <p className={`${styles.strength} ${styles[strength]}`}>
            Password Strength: {strength}
          </p>
        )}
        {errors.password && <small>{errors.password}</small>}

        <input
          type="date"
          name="dob"
          onChange={handleChange}
        />
        {errors.dob && <small>{errors.dob}</small>}

        <div className={styles.gender}>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
            /> Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
            /> Female
          </label>
        </div>
        {errors.gender && <small>{errors.gender}</small>}

        <button className={styles.lbtn} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className={styles.link}>
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
