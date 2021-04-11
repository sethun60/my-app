import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./TeamItem.module.css";

export default function TeamItem(props) {
  const { id = "", name = "" } = props;

  const history = useHistory();
  const clickHandler = (e) => {
    history.push(`/team?id=${id}`);
  };

  return (
    <div
      className={styles.teamContainer}
      data-testid="team-item-container"
      onClick={(e) => clickHandler(e)}
    >
      <div className={styles.contents}>
        <p className={styles.teamName}>Name: {name}</p>
        <p className={styles.teamId}>ID: {id}</p>
      </div>
    </div>
  );
}
