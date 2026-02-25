import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { useRouter } from "next/router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const normalizedCart = storedCart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "",
      }));

      setCartItems(normalizedCart);
    };

    loadCart();
    window.addEventListener("cart-change", loadCart);

    return () => window.removeEventListener("cart-change", loadCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart-change"));
  };

  const increaseQty = (id) =>
    updateCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    updateCart(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  const removeItem = (id) =>
    updateCart(cartItems.filter((item) => item.id !== id));

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const getImageUrl = (image) => {
  if (!image) return "/images/default.jpg";

  if (image.startsWith("http")) return image;

  return image.startsWith("/uploads")
    ? `http://localhost:5005${image}`
    : `http://localhost:5005/uploads/${image}`;
};
  

  const handleCheckout = () => {
  router.push("/client/checkout");
};

  return (
    <div className={styles.container}>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price}</p>

                  <div className={styles.qtyControls}>
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}