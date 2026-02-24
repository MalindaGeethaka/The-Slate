import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";

export default function FoodDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5005/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <p className={styles.loading}>Loading...</p>;

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/client/login?redirect=${router.asPath}`);
      return;
    }

    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Normalize item ID
    const itemId = item.id || item._id;

    // Check if item already exists in cart
    const existingIndex = cart.findIndex((i) => i.id === itemId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: itemId,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image || "",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch event so Cart page & Navbar can listen
    window.dispatchEvent(new Event("cart-change"));

    alert(`${item.name} x${quantity} added to cart`);
  };

  const imageUrl = item.image.startsWith("/uploads")
    ? `http://localhost:5005${item.image}`
    : `http://localhost:5005/uploads/${item.image}`;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={item.name} className={styles.image} />
      </div>

      <h1 className={styles.title}>{item.name}</h1>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.rating}>⭐ {item.rating}</p>
      <h3 className={styles.price}>Rs. {item.price}</h3>

      <div className={styles.quantityWrapper}>
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className={styles.quantityInput}
        />
      </div>

      <button className={styles.addButton} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}