import React from "react";
import styles from "./TeamItem.module.css";

export default function TeamItem(props) {
  const { id = "", name = "" } = props;
  return (
    <div className={styles.teamContainer}>
      <div className={styles.contents}>
        <p className={styles.teamName}>Name: {name}</p>
        <p className={styles.teamId}>ID: {id}</p>
      </div>
    </div>
  );
}
