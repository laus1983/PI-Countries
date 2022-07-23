import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CountryDetails from ".//components/CountryDetails/CountryDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/countries" component={Home} />
          <Route exact path="/countries/:id" component={CountryDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
