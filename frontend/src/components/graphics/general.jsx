import React from "react";
import { Bar, BarChart, Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import "./graphics.css";

const GeneralDashboard = ({ stats }) => {
    const barData = [
        { name: "Partners", value: stats.totalPartners },
        { name: "Companies", value: stats.totalCompanies },
    ];

    const pieData = [
        { name: "Average Participation", value: stats.avgParticipationPerPartner },
        { name: "Remaining", value: 100 - stats.avgParticipationPerPartner },
    ];

    const radarData = [
        { metric: "Avg Partners per Company", value: stats.avgParnersPerCompany },
        { metric: "Avg Participation per Partner", value: stats.avgParticipationPerPartner },
        { metric: "Total Partners", value: stats.totalPartners },
        { metric: "Total Companies", value: stats.totalCompanies },
    ];

    return (
        <div className="dashboard-charts">

            <div className="highlight-container">
                <h3>Company with Most Partners: <span>{stats.companyMostPartners}</span></h3>
                <h3>Partner with Most Companies: <span>{stats.partnerMostCompanies}</span></h3>
            </div>

            <div className="chart-container">
                <h3>Partners vs Companies</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>Average Participation Percentage</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#007bff" dataKey="value" label>
                            <Cell key="a" fill="#007bff" />
                            <Cell key="b" fill="#ddd" />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>Average Partners per Company</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[{ name: "Avg Partners per Company", value: stats.avgParnersPerCompany }]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>Metrics Comparison</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis />
                        <Radar name="Metrics" dataKey="value" stroke="#007bff" fill="#007bff" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GeneralDashboard;
