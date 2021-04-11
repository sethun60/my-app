/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../../atoms/Search/Search";
import UserItem from "../../atoms/UserItem/UserItem";
import { endPoints } from "../../utils/getEndPoints";
import { searchFilterUtil } from "../../utils/searchFilterUtil";

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function Team() {
  const [teamID, setTeamId] = useState("");
  const [teamInfo, setTeamInfo] = useState({});
  const [searchString, setSearchString] = useState("");
  const { teamMemberIds: fullTeamMemberIds = [] } = teamInfo;
  const [allUsers, setAllUsers] = useState([]);
  const [displayTeamMembers, setDisplayTeamMembers] = useState([]);
  const query = useQuery();

  useEffect(() => {
    setTeamId(query.get("id"));
  }, []);

  useEffect(() => {
    async function makeAsyncCall() {
      let teamInfo = await fetch(`${endPoints.teams}/${teamID}`);
      teamInfo = await teamInfo.json();
      setTeamInfo(teamInfo);
    }

    teamID && makeAsyncCall();
  }, [teamID]);

  useEffect(() => {
    async function makeAsyncCall(memberID) {
      let user = await fetch(`${endPoints.users}/${memberID}`);
      user = await user.json();
      setAllUsers((oldArr) => [...oldArr, user]);
    }
    fullTeamMemberIds.length > 0 &&
      fullTeamMemberIds.forEach((id) => makeAsyncCall(id));
  }, [teamInfo]);

  useEffect(() => {
    setDisplayTeamMembers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    const filteredMemberIds = searchFilterUtil(
      allUsers,
      "displayName",
      searchString
    );

    if (!!searchString) {
      setDisplayTeamMembers(filteredMemberIds);
    } else {
      setDisplayTeamMembers(allUsers);
    }
  }, [searchString]);

  const onSearchUpdate = (e) => {
    const searchQuery = e.target.value;
    setSearchString(searchQuery);
  };

  return (
    <div>
      <p>Team page</p>
      <Search onChange={onSearchUpdate} />
      {displayTeamMembers &&
        displayTeamMembers.map((user, index) => {
          return <UserItem {...user} key={index} />;
        })}
    </div>
  );
}
