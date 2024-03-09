import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Admin from "./routes/Admin";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
