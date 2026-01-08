import { useState } from "react";
import styles from "../../../styles/Menu.module.css";

const categories = [
  "All",
  "Mains",
  "Beverages",
  "Desserts",
  "Coffee",
  "Snacks",
];

export default function MenuFilters({ active, setActive }) {
  return (
    <div className={styles.filters}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? styles.active : ""}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}