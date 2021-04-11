import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Search from "../../atoms/Search/Search";
import { makeAPICall } from "../../../features/dashboard/dashboardSlice";
import UserItem from "../../atoms/UserItem/UserItem";
import { endPoints } from "../../../utils/getEndPoints";

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
      let teamInfo = await dispatch(
        makeAPICall(`${endPoints.teams}/${teamID}`)
      );
      setTeamInfo(teamInfo.payload);
    }

    teamID && makeAsyncCall();
  }, [teamID]);

  useEffect(() => {
    setTeamId(query.get("id"));
  }, [query]);

  useEffect(() => {
    async function makeAsyncCall(memberID) {
      let user = await dispatch(makeAPICall(`${endPoints.users}/${memberID}`));
      setAllUsers((oldArr) => [...oldArr, user.payload]);
    }
    fullTeamMemberIds.length > 0 &&
      fullTeamMemberIds.forEach((id) => makeAsyncCall(id));
  }, [teamInfo]);

  useEffect(() => {
    setDisplayTeamMembers(allUsers);
  }, [allUsers]);

  function filterIt(arr, key, searchKey) {
    return arr.filter(function (obj) {
      return Object.keys(obj).some(() => {
        return obj[key].toLowerCase().includes(searchKey.toLowerCase());
      });
    });
  }

  useEffect(() => {
    const filteredMemberIds = filterIt(allUsers, "displayName", searchString);

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
