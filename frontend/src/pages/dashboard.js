import React, { useEffect, useState } from "react";
import GeneralDashboard from "../components/graphics/general.jsx";
import PerCompany from "../components/graphics/perCompany.jsx";
import PerPartner from "../components/graphics/perPartner.jsx";

const Dashboard = () => {
    const [stats, setStats] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dashboard-backend-ngl8.onrender.com/dashboard-general-stats/", {
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setStats(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []); // executa só uma vez -> ao carregar a página

    return (
        <div>
            {stats ? <GeneralDashboard stats={stats} /> : <p>No data available.</p>}
            <PerPartner />
            <PerCompany />
        </div>
    );
};

export default Dashboard;
