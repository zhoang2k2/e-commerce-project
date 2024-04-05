/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductList from "../table/Table";

function SidebarRoute() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} render={() => <ProductList />} />
      </Switch>
    </>
  );
}

export default SidebarRoute;
