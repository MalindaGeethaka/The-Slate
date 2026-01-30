import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    setProfileOpen(false);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* Left */}
      <div className={styles.left}>
        <img src="/images/logo.png" alt="The Slate Logo" className={styles.logo} />
        <span className={styles.brand}>The Slate</span>
      </div>

      {/* Center */}
      <div className={`${styles.center} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/venue" onClick={() => setMenuOpen(false)}>Venue</Link>
      </div>

      {/* Right */}
      <div className={styles.right}>
        {!isAuth ? (
          <>
            <button
              className={styles.lButton}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className={styles.lButton}
              onClick={() => router.push("/client/register")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className={styles.profileWrapper}>
            <img
              src="/images/profile.png"
              alt="Profile"
              className={styles.profileIcon}
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className={styles.profileDropdown}>
                <p onClick={() => router.push("/client/profile")}>Profile</p>
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        )}

        {/* Hamburger */}
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
