import styles from "../../styles/CustomSections.module.css";

export default function SectionOne() {
  return (
    <section className={styles.sectionOne}>
        <div className={styles.yellowBox}>
          <h1>Fresh & Premium</h1>
          <p>Crafted with love and the finest ingredients.</p>
        </div>
      <div className={styles.imageWrapper}>
        <img src="/images/sec1.jpg" alt="Food" />
        </div>
        <div className={styles.textSec}>
          <h1>Among the best Saudi Chefs in the world,
            serving you excellence on a plate.
          </h1>
        </div>
        
      
    </section>
  );
}
