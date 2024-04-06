/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsTable from "../table/ProductsTable";

function SidebarRoute() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} render={() => <ProductsTable />} />
      </Switch>
    </>
  );
}

export default SidebarRoute;
