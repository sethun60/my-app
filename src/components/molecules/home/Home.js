import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";

export function Home() {
  const [teams, setTeams] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    const endPoint =
      "https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/";

    async function makeAPICall() {
      let res = await fetch(endPoint);
      res = await res.json();
      setTeams({ loading: false, data: res });
    }

    makeAPICall();
  }, []);

  console.log("teams", teams);

  return (
    <div>
      <p className={styles.p}>Home in green</p>
    </div>
  );
}
