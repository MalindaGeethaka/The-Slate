
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Checkout.module.css";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/client/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      router.push("/client/cart");
      return;
    }

    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      customer: formData,
      items: cartItems,
      total: totalPrice,
      date: new Date(),
    };

    console.log("ORDER DATA:", orderData);

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-change"));

    alert("Order placed successfully!");

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          onChange={handleChange}
        />
      </div>

      <div className={styles.summary}>
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <p>{item.name} x {item.quantity}</p>
            <p>Rs. {item.price * item.quantity}</p>
          </div>
        ))}

        <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
      </div>

      <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}