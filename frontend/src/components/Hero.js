import { useEffect, useState } from "react";
import styles from "../../styles/hero.module.css";

const slides = [
  {
    text: "Serving Happiness On A Plate",
    image: "/images/chikka.png",
  },
  {
    text: "Savor The Flavor Of Fresh Ingredients",
    image: "/images/sushi1.png",
  },
  {
    text: "Experience Culinary Excellence",
    image: "/images/sushi.png",
  },
  {
    text: "Our Dish Will Leave You Wanting More",
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
      
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${slides[current].image})` }}
      />

     
      <div className={styles.content}>
        
        <div className={styles.left}>
          <h1 key={current}>{slides[current].text}</h1>
        </div>

       
        <div className={styles.center}>
          <img
            src={slides[current].image}
            alt="Food"
            key={slides[current].image}
          />
        </div>

        
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
