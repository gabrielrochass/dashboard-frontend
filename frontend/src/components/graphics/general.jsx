import React, { useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Navbar from "../navbar/navbar";
import "./graphics.css";
import ShowAll from "./showAll";

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
        // essa usa metric e não name porque é o que o recharts de radar pede
        { metric: "Avg Partners per Company", value: stats.avgParnersPerCompany },
        { metric: "Avg Participation per Partner", value: stats.avgParticipationPerPartner },
        { metric: "Total Partners", value: stats.totalPartners },
        { metric: "Total Companies", value: stats.totalCompanies },
    ];

    const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2"];

    return (
        <div className="dashboard">
            <Navbar />
            <div className="header">
                <h1>General Dashboard</h1>
            </div>

            <div className="dashboard-charts">
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
                    <h3>
                        Average Partners per Company: 
                        <div className="highlight-company">
                            <span>{stats.avgParnersPerCompany}</span>
                        </div>
                    </h3>
                </div>

                <div className="chart-container">
                    <h3>Partners vs Companies</h3>
                    {/* simple bar chart */}
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip /> {/* mostra info quando o user passa o mouse */} 
                            <Bar dataKey="value"> {/* cria a barra com o tamanho de value*/} 
                                {barData.map((entry, index) => (
                                    // mapeia e personaliza cada celula 
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> 
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    {/* two simple pie chart */}
                    <h3>Average Participation Percentage</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} 
                            cx="50%"  // centraliza o grafico
                            cy="50%" 
                            outerRadius={80}  // tamanho do grafico
                            dataKey="value" label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Metrics Comparison</h3>
                    {/* simple radar chart */}
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                            <PolarGrid /> 
                            <PolarAngleAxis dataKey="metric" /> {/* rótulos das dimensões */} 
                            <PolarRadiusAxis /> 
                            <Radar name="Metrics" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container-all">
                    <ShowAll />
                </div>
            </div>
        </div>
    );
};

export default GeneralDashboard;
