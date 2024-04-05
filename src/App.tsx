import "./styles/resetStyle.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import store from "./redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} exact />
          <Route path="/" component={HomePage} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
