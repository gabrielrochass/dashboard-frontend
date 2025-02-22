import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Dashboard from "./pages/dashboard.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <ToastContainer />
            <Dashboard />
          </div>} />
      </Routes>
    </Router>
  );
}

export default App;
