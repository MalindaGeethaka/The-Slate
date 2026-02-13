import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Session expired");
        router.push("/login");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>

      <div className={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || "User"}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>

        <button onClick={() => router.push("/change-password")}>
          Change Password
        </button>
      </div>
    </div>
  );
}
