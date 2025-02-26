import React, { useEffect, useState } from "react";
import GeneralDashboard from "../components/graphics/general.jsx";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/dashboard-general-stats/", {
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
    }, []);

    return (
        <div>
            <ul>
                <li><a href="/">Voltar</a></li>
            </ul>
            
            <h2>General Dashboard</h2>
            {stats ? <GeneralDashboard stats={stats} /> : <p>No data available.</p>}
        </div>
    );
};

export default Dashboard;
