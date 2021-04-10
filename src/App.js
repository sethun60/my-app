import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Team } from "./components/molecules/team/team";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
          <Switch>
            <Route path="/home" component={Dashboard} />
            <Route path="/team" component={Team} />
          </Switch>
        </main>
      </header>
    </div>
  );
}

export default App;
