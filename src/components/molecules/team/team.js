import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeAPICall } from "../../../features/dashboard/dashboardSlice";
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
  const query = useQuery();

  useEffect(() => {
    async function makeAsyncCall() {
      let teamInfo = await dispatch(makeAPICall(`${URL.teams}/${teamID}`));
      setTeamInfo(teamInfo.payload);
    }

    teamID && makeAsyncCall();
  }, [teamID]);

  useEffect(() => {
    setTeamId(query.get("id"));
  }, [query]);

  return (
    <div>
      <p>Team page</p>
      <p>{JSON.stringify(teamInfo)}</p>
    </div>
  );
}
