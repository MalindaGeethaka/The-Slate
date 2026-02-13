import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

export default function AdminOrders() {
  const [order, setOrder] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5005/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrder(res.data);
  };

  return (
    <AdminLayout>
      <h1>Orders</h1>

      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {order.map((order) => (
            <tr key={order._id}>
              <td>{order.user}</td>
              <td>Rs. {order.total}</td>
              <td>{order.status}</td>
              <td>{order.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
