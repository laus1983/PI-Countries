import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import ActivityCreationForm from "./components/ActivityCreationForm/ActivityCreationForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/countries" component={Home} />
          <Route exact path="/countries/:id" component={CountryDetails} />
          <Route exact path="/activities" component={ActivityCreationForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
