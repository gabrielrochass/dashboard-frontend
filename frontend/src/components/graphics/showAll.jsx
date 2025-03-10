import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./graphics.css";

function ShowAll() {
    const [partners, setPartners] = useState([]);
    const [participations, setParticipations] = useState([]);

    useEffect(() => {
        fetchPartners();
        fetchParticipations();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/partners/");
            setPartners(response.data);
        } catch (error) {
            toast.error("Failed to fetch partners!");
        }
    };

    const fetchParticipations = async () => {
        try {
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/participations/");
            setParticipations(response.data);
        } catch (error) {
            toast.error("Failed to fetch participations!");
        }
    };

    const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

    const groupedByCompany = participations.reduce((acc, p) => {
        if (!acc[p.companyName]) {
            acc[p.companyName] = [];
        }
        acc[p.companyName].push({ name: p.partnerName, value: parseFloat(p.percentage) });
        return acc;
    }, {});

    return (
        <div className="dashboard-all">
            {Object.keys(groupedByCompany).map((company, index) => {
                const totalParticipation = groupedByCompany[company].reduce((sum, p) => sum + p.value, 0);
                const remaining = totalParticipation < 100 ? 100 - totalParticipation : 0;

                const data = [
                    ...groupedByCompany[company],
                    remaining > 0 ? { name: "Unsigned", value: remaining } : null
                ].filter(Boolean);

                return (
                    <div key={index} className="chart-section">
                        <h4 className="chart-subtitle">{company}</h4>
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    label={(entry) => `${entry.value.toFixed(2)}%`}
                                >
                                    {data.map((entry, idx) => (
                                        <Cell 
                                            key={`cell-${idx}`} 
                                            fill={entry.name === "Unsigned" ? "gray" : COLORS[idx % COLORS.length]} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            })}
        </div>
    );
}

export default ShowAll;
