import { Route, Switch } from "react-router-dom";
import Shop from "../components/Shop/Shop";
import Home from "../components/Home/Home";

function NavbarRoutes() {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/homepage"} component={Home} />
        <Route exact path={"/shop"} component={Shop} />
      </Switch>
    </>
  );
}

export default NavbarRoutes;
