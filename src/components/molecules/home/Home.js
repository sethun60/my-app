/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TeamItem from "../../atoms/TeamItem/TeamItem";
import Search from "../../atoms/Search/Search";
import { makeAPICall } from "../../../features/dashboard/dashboardSlice";
import styles from "./Home.module.css";
import { endPoints } from "../../utils/getEndPoints";
import { searchFilterUtil } from "../../utils/searchFilterUtil";

export function Home() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    async function makeAsyncCall() {
      let res = await dispatch(makeAPICall(endPoints.teams));
      setTeams(res.payload);
      setDisplayTeams(res.payload);
    }
    makeAsyncCall();
  }, []);

  useEffect(() => {
    const filteredTeams = searchFilterUtil(teams, "name", searchString);
    searchString ? setDisplayTeams(filteredTeams) : setDisplayTeams(teams);
  }, [searchString]);

  const onSearchUpdate = (e) => {
    const searchQuery = e.target.value;
    setSearchString(searchQuery);
  };

  return (
    <div>
      <p className={styles.p}>Dashboard - Teams Overview</p>
      <Search onChange={onSearchUpdate} />
      <div className={styles.teams}>
        {displayTeams &&
          displayTeams.map((item, index) => {
            return <TeamItem {...item} key={index} />;
          })}
      </div>
    </div>
  );
}
