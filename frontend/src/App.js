import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PartnerHistory from "./components/history/history.js";
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
          </div>} 
        />
        <Route path="/history" element={<PartnerHistory />} /> {/* Usando o componente correto */}
      </Routes>
    </Router>
  );
}

export default App;
