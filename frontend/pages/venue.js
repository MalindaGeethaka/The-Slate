import styles from "../styles/Venue.module.css";

export default function Venue() {
  return (
    <div className={styles.venuePage}>
      {/* Title Section */}
      <section className={styles.header}>
        <h1>Our Venue</h1>
        <p>
          Located in the heart of the city, The Slate offers a warm and
          welcoming atmosphere where great food meets great memories.
        </p>
      </section>

      
      <section className={styles.mapSection}>
        <a
          href="https://www.google.com/maps"
          target="PLATES, 77 Galle Rd, Colombo 00300"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          <img
            src="/images/map.png"
            alt="Venue Location Map"
          />
          <div className={styles.mapOverlay}>
            <span>Click to View on Google Maps</span>
          </div>
        </a>
      </section>
    </div>
  );
}
