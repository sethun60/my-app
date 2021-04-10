import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Search from "../../atoms/Search/Search";
import { makeAPICall } from "../../../features/dashboard/dashboardSlice";
import UserItem from "../../atoms/UserItem/UserItem";
import URL from "../../../utils/getUrl";

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function Team() {
  const dispatch = useDispatch();
  const [teamID, setTeamId] = useState("");
  const [teamInfo, setTeamInfo] = useState({});
  const [searchString, setSearchString] = useState("");
  const { teamMemberIds: fullTeamMemberIds = [] } = teamInfo;
  const [allUsers, setAllUsers] = useState([]);
  const [displayTeamMembers, setDisplayTeamMembers] = useState([]);
  const query = useQuery();

  useEffect(() => {
    async function makeAsyncCall() {
      let teamInfo = await dispatch(makeAPICall(`${URL.teams}/${teamID}`));
      setTeamInfo(teamInfo.payload);
      setDisplayTeamMembers(teamInfo.payload.teamMemberIds);
    }

    teamID && makeAsyncCall();
  }, [teamID]);

  useEffect(() => {
    setTeamId(query.get("id"));
  }, [query]);

  useEffect(() => {
    async function makeAsyncCall(memberID) {
      let user = await dispatch(makeAPICall(`${URL.users}/${memberID}`));
      setAllUsers((oldArr) => [...oldArr, user.payload]);
    }
    fullTeamMemberIds.length > 0 &&
      fullTeamMemberIds.forEach((id) => makeAsyncCall(id));
  }, [teamInfo]);

  useEffect(() => {
    console.log("search useEffect called", searchString);
    // const filteredMembers = fullTeamMemberIds.filter((obj) =>
    //   Object.values(obj).some((val) =>
    //     val.toLowerCase().includes(searchString.toLowerCase())
    //   )
    // );

    // console.log("filteredMembers", filteredMembers);

    // if (filteredMembers !== undefined && filteredMembers.length != 0) {
    //   setDisplayTeamMembers(filteredMembers);
    // } else {
    //   setDisplayTeamMembers(fullTeamMemberIds);
    // }
  }, [searchString]);

  const onSearchUpdate = (e) => {
    const searchQuery = e.target.value;
    searchQuery && setSearchString(searchQuery);
  };

  return (
    <div>
      <p>Team page</p>
      <Search onChange={onSearchUpdate} />
      {allUsers &&
        allUsers.map((user, index) => {
          return <UserItem {...user} key={index} />;
        })}
    </div>
  );
}
