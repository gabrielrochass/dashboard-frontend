import React, { useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./graphics.css";
import PerPartner from "./perPartner";

const GeneralDashboard = ({ stats }) => {
    const [selectedPartner, setSelectedPartner] = useState(null);

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

    const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2"];

    return (
        <div className="dashboard-charts">
            <div className="header">
                <h1>General Dashboard</h1>
            </div>

            {selectedPartner ? (
                <div>
                    <button className="back-button" onClick={() => setSelectedPartner(null)}>
                        ← Voltar ao Dashboard Geral
                    </button>
                    <PerPartner onSelectPartner={setSelectedPartner} />
                </div>
            ) : (
                <>
                    <div className="highlight-container">
                        <h3>Company with Most Partners: 
                            <div className="highlight-company">
                                <span>{stats.companyMostPartners}</span>
                            </div>
                        </h3>
                        <h3>Partner with Most Companies:
                            <div className="highlight-company">
                                <span>{stats.partnerMostCompanies}</span>
                            </div>
                        </h3>
                    </div>

                    <div className="chart-container">
                        <h3>Partners vs Companies</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value">
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-container">
                        <h3>Average Participation Percentage</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
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
                                <Bar dataKey="value" fill={COLORS[0]} />
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
                                <Radar name="Metrics" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default GeneralDashboard;
