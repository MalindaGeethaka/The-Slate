import { useEffect, useState } from "react";
import AdminLayout from "../admin/AdminLayout";
import axios from "axios";
import styles from "./css/adminMenu.module.css";

export default function AdminUsers() {
  const [user, setUser] = useState([]);

   const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

    const deleteUser = async (id) => {
      if (!confirm("Are you sure you want to delete this user?")) return;
    
      try {
        await axios.delete(`http://localhost:5005/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUser();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user");
      }
    };
  

  return (
    <AdminLayout>
      <div className={styles.tableWrapper}>
        <h2>Manage Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
} 