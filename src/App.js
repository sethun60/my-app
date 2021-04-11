import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Team } from "./components/molecules/Team/Team";
import { Root } from "./components/molecules/Root/Root";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
          <Router>
            <Switch>
              <Route path="/" component={Root} exact />
              <Route path="/home" component={Dashboard} />
              <Route path="/team" component={Team} />
            </Switch>
          </Router>
        </main>
      </header>
    </div>
  );
}

export default App;
