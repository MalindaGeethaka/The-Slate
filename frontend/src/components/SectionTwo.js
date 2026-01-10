import styles from "../../styles/CustomSections.module.css";

export default function SectionTwo() {
  return (
    <section className={styles.sectionTwo}>
      <div className={styles.leftImage}>
        <img src="/images/venM.jpg" alt="Venue" />
      </div>

      <div className={styles.rightContent}>
  <div className={styles.textTop}>
   
    <h1>Experience The Atmosphere</h1>
    <p>
      Step into a world where taste meets ambience. Every corner of The
          Slate is designed to delight your senses.
     
    </p>
  </div>

  <div className={styles.imageGrid}>
    <img src="/images/ven1.jpg" />
    <img src="/images/ven2.jpg" />
    <img src="/images/ven3.jpg" />
  </div>
</div>

    </section>
  );
}
