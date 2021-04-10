import React from "react";
import { Home } from "../../components/molecules/home/Home";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  return (
    <div>
      <p className={styles.p}>dashboard</p>
      <Home />
    </div>
  );
}
