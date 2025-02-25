import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // pop up notifications
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
            {/* <Companies/> */}
          </div>} />
      
      </Routes>
    </Router>
  );
}

export default App;
