import styles from "../../styles/CustomSections.module.css";

export default function SectionThree() {
  return (
    <section className={styles.sectionThree}>
      <div className={styles.text}>
         <h1>Signature Dishes</h1>
        <p>
           Our chef’s special creations blend tradition with modern taste to
      deliver unforgettable flavors.
        </p>
      </div>

      <div className={styles.video}>
        <video src="/videos/vid.mp4" autoPlay muted loop />
      </div>
    </section>
  );
}
