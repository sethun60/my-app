import React from "react";
import styles from "./Search.module.css";

export default function Search(props) {
  const { onChange } = props;
  return (
    <div className={styles.searchContainer} data-testid="search-container">
      <label htmlFor="teams-search">Search the site : </label>
      <input
        data-testid="search-input"
        type="search"
        id="teams-search"
        aria-label="Search through teams"
        onChange={(e) => onChange(e)}
      />
      <button>Search</button>
    </div>
  );
}
