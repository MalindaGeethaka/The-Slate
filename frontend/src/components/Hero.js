import { useEffect, useState } from "react";
import styles from "../../styles/hero.module.css";

const slides = [
  {
    text: "Serving happiness on plates",
    image: "/images/chikka.png",
  },
  {
    text: "Irresistible food worth remembering",
    image: "/images/sushi1.png",
  },
  {
    text: "Delicious meals made daily",
    image: "/images/sushi.png",
  },
  {
    text: "Our dish will leave you wanting more",
    image: "/images/sushi3.png",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Blurred background */}
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${slides[current].image})` }}
      />

      {/* Foreground content */}
      <div className={styles.content}>
        {/* Left text */}
        <div className={styles.left}>
          <h1 key={current}>{slides[current].text}</h1>
        </div>

        {/* Center image */}
        <div className={styles.center}>
          <img
            src={slides[current].image}
            alt="Food"
            key={slides[current].image}
          />
        </div>

        {/* Right vertical carousel */}
        <div className={styles.carousel}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt="thumb"
              className={`${styles.thumb} ${
                current === index ? styles.active : ""
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
