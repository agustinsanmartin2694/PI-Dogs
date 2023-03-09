import "./App.css";
import { Route, } from "react-router-dom";
import LandingPage from "./Components/LandingPage/landingpage.jsx"
import Home from "./Components/Homepage/homepage.jsx"
import Details from "./Components/DetailPage/detailpage.jsx"
import Form from "./Components/Form/form.jsx"


function App() {
  return (
    <div className="App">
      
        <Route exact path={"/"}>
          <LandingPage />
        </Route>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/form"}>
          <Form />
        </Route>
        <Route path={"/details"}>
          <Details />
        </Route>
      
    </div>
  );
}

export default App;
