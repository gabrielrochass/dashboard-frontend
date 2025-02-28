import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // pop up notifications
import ShowCompany from "./components/companies/showCompany";
import Navbar from "./components/navbar/navbar.jsx";
import ParticipationTable from "./components/participation/participationTable";
import ShowPartners from "./components/partners/showPartners";
import "./index.css";
import Dashboard from "./pages/dashboard.js";
import Home from "./pages/home.jsx";


function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={
          <div>
            <Navbar />
            <Home />
          </div>} />
        
        <Route path="/partners" element={
          <div>
            <ToastContainer/>
            <ShowPartners/>
          </div>} />
        
        <Route path="/companies" element={
          <div>
            <ToastContainer/>
            <ShowCompany/>
          </div>} />

        <Route path="/participation" element={
          <div>
            <ToastContainer/>
            <ParticipationTable/>
          </div>} />
        
        <Route path="/dashboard" element={
          <div>
            <ToastContainer/>
            <Dashboard />
          </div>} />
      
      </Routes>
    </Router>
  );
}

export default App;
