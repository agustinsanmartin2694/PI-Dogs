import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingpage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>WELCOME TO BREEDKIPEDIA</h1>
      <p className={styles.paragraph}>A Website to search for all dog breeds in the world</p>
      <NavLink to={"/home"} >
        <button className={styles.start}>START 🐕</button>{" "}
      </NavLink>{" "}
    </div>
  );
}
