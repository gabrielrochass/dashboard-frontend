import React, { useEffect, useState } from "react";
import GeneralDashboard from "../components/graphics/general.jsx";

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
    }, []);

    return (
        <div>
            {stats ? <GeneralDashboard stats={stats} /> : <p>No data available.</p>}
        </div>
    );
};

export default Dashboard;
