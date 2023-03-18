import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
interface IRouterProps {}
console.log(process.env.PUBLIC_URL);
function Router() {
  return (
    <HashRouter basename={"/"}>
      <Switch>
        <Route path="/" exact>
          <Coins />
        </Route>
        <Route path="/:coinId">
          <Coin />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;
