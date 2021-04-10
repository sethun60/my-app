import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeAPICall } from "./../../../features/dashboard/dashboardSlice";
import styles from "./Home.module.css";
import URL from "../../../utils/getUrl";

export function Home() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    async function makeAsyncCall() {
      let res = await dispatch(makeAPICall(URL.teams));
      setTeams(res.payload);
    }
    makeAsyncCall();
  }, []);

  return (
    <div>
      <p className={styles.p}>Home in green</p>
    </div>
  );
}
