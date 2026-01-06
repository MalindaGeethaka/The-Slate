import styles from "../../styles/CustomSections.module.css";

export default function SectionOne() {
  return (
    <section className={styles.sectionOne}>
        <div className={styles.yellowBox}>
          <h2>Fresh & Premium</h2>
          <p>Crafted with love and the finest ingredients.</p>
        </div>
      <div className={styles.imageWrapper}>
        <img src="/images/sec1.jpg" alt="Food" />
        </div>
        
      
    </section>
  );
}
