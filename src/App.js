import React from "react";
import logo from "./logo.svg";
import { Dashboard } from "./features/dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
