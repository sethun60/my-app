import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";

export default function Search(props) {
  const { onChange } = props;
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="teams-search">Search the site : </label>
      <input
        type="search"
        id="teams-search"
        name="q"
        aria-label="Search through teams"
        onChange={(e) => onChange(e)}
      />
      <button>Search</button>
    </div>
  );
}
