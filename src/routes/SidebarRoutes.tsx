/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsTable from "../components/ProductTable/ProductsTable";
import AdminAccounts from "../components/Accounts/Accounts";

function SidebarRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}/`} component={ProductsTable} />
        <Route exact path={`${path}/accounts`} component={AdminAccounts} />
      </Switch>
    </>
  );
}

export default SidebarRoutes;
