/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

export function Root() {
  return (
    <div>
      <p>Hello World!</p>
      <Link to="/home">
        <button type="button">Click Me to view teams dashboard!</button>
      </Link>
    </div>
  );
}
