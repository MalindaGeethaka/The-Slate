import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* STORY SECTION */}
      <section className={styles.storySection}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.storyWrapper}>
            {/* Overlay Background */}
            <div className={styles.storyBg}></div>

            {/* Content */}
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <p>
                Founded with a passion for exceptional flavors and warm
                hospitality, The Slate was created to bring people together
                through unforgettable dining experiences.
              </p>

              <div className={styles.storyImages}>
                <img src="/images/story1.jpg" alt="Story 1" />
                <img src="/images/story2.jpg" alt="Story 2" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <h3>About Us</h3>
          <p>
            At The Slate, we believe food is more than nourishment — it is
            an art. Our chefs use fresh ingredients and modern techniques
            to craft dishes that inspire and delight.
          </p>

          <div className={styles.decorBox}></div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className={styles.milestones}>
        <div className={styles.milestone}>
          <h2>2010</h2>
          <p>Founded</p>
        </div>
        <div className={styles.milestone}>
          <h2>2015</h2>
          <p>Second Branch</p>
        </div>
        <div className={styles.milestone}>
          <h2>2018</h2>
          <p>Award Winner</p>
        </div>
        <div className={styles.milestone}>
          <h2>2020</h2>
          <p>Modern Experience</p>
        </div>
      </section>
    </div>
  );
}