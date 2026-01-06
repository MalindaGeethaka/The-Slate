import React, { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo + Name */}
      <div className={styles.left}>
        <img src="./images/logo.png" alt="The Slate Logo" className={styles.logo} />
        <span className={styles.brand}>The Slate</span>
      </div>

      {/* Center: Links */}
      <div className={`${styles.center} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/venue" onClick={() => setMenuOpen(false)}>Venue</Link>
      </div>

      {/* Right: Button */}
      <div className={styles.right}>
        <button className={styles.bookButton} onClick={() => alert("Go to booking page")}>
          Book Now
        </button>

        {/* Hamburger for mobile */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
