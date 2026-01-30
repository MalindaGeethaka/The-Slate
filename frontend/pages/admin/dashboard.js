import AdminLayout from "../../pages/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "20px" }}>
        <StatCard title="Total Orders" value="120" />
        <StatCard title="Revenue" value="$4,500" />
        <StatCard title="Users" value="87" />
        <StatCard title="Menu Items" value="34" />
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
