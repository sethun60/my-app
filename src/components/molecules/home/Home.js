import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TeamItem from "../../atoms/TeamItem/TeamItem";
import { makeAPICall } from "./../../../features/dashboard/dashboardSlice";
import styles from "./Home.module.css";
import URL from "../../../utils/getUrl";

export function Home() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function makeAsyncCall() {
      let res = await dispatch(makeAPICall(URL.teams));
      setTeams(res.payload);
    }
    makeAsyncCall();
  }, []);

  return (
    <div>
      <p className={styles.p}>Dashboard - Teams Overview</p>
      <div className={styles.teams}>
        {teams &&
          teams.map((item, index) => {
            return <TeamItem {...item} key={index} />;
          })}
      </div>
    </div>
  );
}
