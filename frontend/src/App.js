import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Dashboard />
          } />
      </Routes>
    </Router>
  );
}

export default App;
