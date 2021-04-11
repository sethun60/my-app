import React from "react";
import styles from "./UserItem.module.css";

export default function UserItem(props) {
  const { firstName = "", lastName = "", avatarUrl = "" } = props;

  return (
    <div className={styles.userContainer} data-testid="user-item-container">
      <div className={styles.contents}>
        <p className={styles.user}>{`Name: ${firstName} ${lastName}`}</p>
        <img src={avatarUrl} alt="" />
      </div>
    </div>
  );
}
