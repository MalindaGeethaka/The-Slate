import { useEffect,useState } from "react";
import AdminLayout from "../../pages/admin/AdminLayout";
import axios from "axios";

export default function AdminDashboard() {
  
 const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalMenuItems: 0,
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5005/api/admin/dashboard-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <StatCard title="Orders" value={stats.totalOrders} />
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Menu Items" value={stats.totalMenuItems} />
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
      <p style={{ color: "#6b7280" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}


AdminDashboard.getLayout = function PageLayout(page) {
  return page; // no navbar, no footer
};
