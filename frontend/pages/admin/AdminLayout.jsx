import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./css/adminLayout.module.css";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.role !== "admin") {
      router.push("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
        <nav>
          <p onClick={() => router.push("/admin/dashboard")}>Dashboard</p>
          <p onClick={() => router.push("/admin/menu")}>Menu</p>
          <p onClick={() => router.push("/admin/orders")}>Orders</p>
          <p onClick={() => router.push("/admin/users")}>Users</p>
          <p onClick={logout}>Logout</p>
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
