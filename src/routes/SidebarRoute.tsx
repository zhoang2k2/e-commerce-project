/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsTable from "../components/Table/ProductsTable";
import BlankBody from "../components/Body/BlankBody";

function SidebarRoute() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path} render={() => <BlankBody />} />
        <Route path={`${path}/products`} render={() => <ProductsTable />} />
      </Switch>
    </>
  );
}

export default SidebarRoute;
