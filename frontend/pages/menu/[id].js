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
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) return <p className={styles.loading}>Loading...</p>;


  const buildImageUrl = (image) => {
    if (!image) return "/images/default.jpg";

    if (image.startsWith("http")) return image;

    if (image.startsWith("/uploads")) {
      return `http://localhost:5005${image}`;
    }

    return `http://localhost:5005/uploads/${image}`;
  };

  const imageUrl = buildImageUrl(item.image);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/client/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const itemId = item._id || item.id;

    const existingIndex = cart.findIndex((i) => i.id === itemId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: itemId,
        name: item.name,
        price: item.price,
        quantity: quantity,
        image: buildImageUrl(item.image), 
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cart-change"));

    alert(`${item.name} x${quantity} added to cart`);
  };

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
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className={styles.quantityInput}
        />
      </div>

 
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}