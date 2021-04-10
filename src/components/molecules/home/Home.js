import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TeamItem from "../../atoms/TeamItem/TeamItem";
import Search from "../../atoms/Search/Search";
import { makeAPICall } from "../../../features/dashboard/dashboardSlice";
import styles from "./Home.module.css";
import URL from "../../../utils/getUrl";

export function Home() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    async function makeAsyncCall() {
      let res = await dispatch(makeAPICall(URL.teams));
      setTeams(res.payload);
      setDisplayTeams(res.payload);
    }
    makeAsyncCall();
  }, []);

  useEffect(() => {
    const filteredTeams = teams.filter((obj) =>
      Object.values(obj).some((val) =>
        val.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    setFilteredTeams(filteredTeams);

    if (filteredTeams !== undefined || filteredTeams.length != 0) {
      setDisplayTeams(filteredTeams);
    } else {
      setDisplayTeams(teams);
    }
  }, [searchString]);

  const onSearchUpdate = (e) => {
    const searchQuery = e.target.value;
    searchQuery && setSearchString(searchQuery);
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
