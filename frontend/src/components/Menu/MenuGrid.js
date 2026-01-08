import styles from "../../../styles/Menu.module.css";
import Link from "next/link";

export default function MenuGrid({ items }) {
  return (
    <section className={styles.menuGrid}>
      {items.map((item) => (
        <Link key={item.id} href={`/menu/${item.id}`}>
          <div className={styles.card}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>⭐ {item.rating}</p>
            <span>${item.price}</span>
          </div>
        </Link>
      ))}
    </section>
  );}