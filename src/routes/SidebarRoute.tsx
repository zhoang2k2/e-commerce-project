/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsTable from "../components/Table/ProductsTable";
// import BlankBody from "../components/Body/BlankBody";
import HomePage from "../pages/HomePage";

function SidebarRoute() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route
          exact
          path={`${path}/products`}
          render={() => <ProductsTable />}
        />
      </Switch>
    </>
  );
}

export default SidebarRoute;
