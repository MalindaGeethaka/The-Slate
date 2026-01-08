import styles from "../../../styles/Menu.module.css";

export default function MenuHero() {
  return (
    <section className={styles.menuHero}>
      <h3 className={styles.subTitle}>Our Menu</h3>

      <div className={styles.titleRow}>
        <h1>Discover Our Menu</h1>

        <p>
          Explore a carefully curated selection of dishes, crafted with premium
          ingredients and inspired by flavors from around the world.
        </p>
      </div>
    </section>
  );
}
