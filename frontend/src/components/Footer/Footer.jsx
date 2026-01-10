import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="The Slate Logo" />
          <span>The Slate</span>
        </div>

        <ul className={styles.nav}>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/venue">Venue</a></li>
        </ul>

        <div className={styles.social}>
          <a href="#"><img src="/images/facebook.png" alt="Facebook" /></a>
          <a href="#"><img src="/images/instagram.png" alt="Instagram" /></a>
          <a href="#"><img src="/images/wa.png" alt="WhatsApp" /></a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>123 Main Street, Colombo, Sri Lanka | +94 11 123 4567 | info@theslate.com</p>
        <p>© 2026 The Slate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
