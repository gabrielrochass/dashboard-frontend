import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // pop up notifications
import ShowCompany from "./components/companies/showCompany";
import ParticipationTable from "./components/participation/participationTable";
import ShowPartners from "./components/partners/showPartners";
import "./index.css";


function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={
          <div>
            <h1> IMPLEMETAR CAPA E LOGIN </h1>
            <nav>
              <ul>
                <li><a href="/partners">Partners</a></li>
                <li><a href="/companies">Companies</a></li>
                <li><a href="/participation">Participation</a></li>
              </ul>
            </nav>
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
            <ParticipationTable/>
            {/* <ParticipationForm/> */}
          </div>} />
      
      </Routes>
    </Router>
  );
}

export default App;
