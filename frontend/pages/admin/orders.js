import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5005/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(res.data);
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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name}</td>
              <td>Rs. {order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.createdAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
