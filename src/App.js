import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Photos from "./components/Photos";
import PhotoDetails from "./components/PhotoDetails";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Photos} />
        <Route path="/:id" component={PhotoDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;