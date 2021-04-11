/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TeamItem from "../../atoms/TeamItem/TeamItem";
import Search from "../../atoms/Search/Search";
import {
  makeAPICall,
  selectTeams,
} from "../../../features/dashboard/dashboardSlice";
import styles from "./Home.module.css";
import { endPoints } from "../../utils/getEndPoints";
import { searchFilterUtil } from "../../utils/searchFilterUtil";

export function Home() {
  const teams = useSelector(selectTeams);
  const dispatch = useDispatch();
  const [displayTeams, setDisplayTeams] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    async function makeAsyncCall() {
      let res = await dispatch(makeAPICall(endPoints.teams));
      setDisplayTeams(res.payload);
    }
    makeAsyncCall();
  }, []);

  useEffect(() => {
    const filteredTeams = searchFilterUtil(teams.value, "name", searchString);
    searchString
      ? setDisplayTeams(filteredTeams)
      : setDisplayTeams(teams.value);
  }, [searchString]);

  // Search handler
  const onSearchUpdate = (e) => {
    const searchQuery = e.target.value;
    setSearchString(searchQuery);
  };

  return (
    <div>
      <p className={styles.p}>Dashboard - Teams Overview</p>
      <Search onChange={onSearchUpdate} />
      <div className={styles.teams}>
        {teams.loading === true && <p>Loading...</p>}
        {teams.loading === false &&
          displayTeams &&
          displayTeams.map((item, index) => {
            return <TeamItem {...item} key={index} />;
          })}
      </div>
    </div>
  );
}
