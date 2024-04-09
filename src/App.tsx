import "./styles/resetStyle.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import store from "./redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={HomePage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  );
}

export default App;
