import styles from "../../../styles/Menu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuGrid({ items, onAddToCart }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleAddToCart = (item) => {
    if (!isAuth) {
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }
    onAddToCart(item);
  };

  return (
    <section className={styles.menuGrid}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <Link href={`/menu/${item.id}`}>
            <img src={item.image} alt={item.name} />
          </Link>

          <h3>{item.name}</h3>
          <h4>{item.description}</h4>
          <p>⭐ {item.rating}</p>
          <span>Rs. {item.price}</span>
        
          <button
            className={styles.cartBtn}
            onClick={() => handleAddToCart(item)}
          >
            {isAuth ? "Add to Cart" : "Order Now"}
          </button>
          
        </div>
      ))}
    </section>
  );
}
