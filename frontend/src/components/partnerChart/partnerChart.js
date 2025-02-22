import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PartnerChart = ({ partners }) => {
    // Agrupar os dados por empresa
    const companies = partners.reduce((acc, partner) => {
        if (!acc[partner.company]) {
            acc[partner.company] = [];
        }
        acc[partner.company].push(partner);
        return acc;
    }, {});

    // Paleta de cores predefinida
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0", "#FF9800", "#8E44AD", "#3498DB", "#E74C3C", "#2ECC71"];

    return (
        <div>
            <h2>Distribuição de Participação por Empresa</h2>
            {Object.keys(companies).map((company) => {
                const companyData = companies[company];

                // Calcular a soma total de participação
                const totalParticipation = companyData.reduce((sum, p) => sum + Number(p.participation), 0);
                const remaining = totalParticipation < 100 ? 100 - totalParticipation : 0;

                const data = {
                    labels: [
                        ...companyData.map((p) => `${p.firstName} ${p.lastName}`),
                        remaining > 0 ? "Unassigned" : null
                    ].filter(Boolean),
                    datasets: [
                        {
                            data: [
                                ...companyData.map((p) => Number(p.participation)),
                                remaining > 0 ? remaining : null
                            ].filter(Boolean),
                            backgroundColor: [
                                ...companyData.map((_, index) => colors[index % colors.length]),
                                remaining > 0 ? "#9E9E9E" : null
                            ].filter(Boolean),
                            hoverBackgroundColor: [
                                ...companyData.map((_, index) => colors[index % colors.length]),
                                remaining > 0 ? "#9E9E9E" : null
                            ].filter(Boolean)
                        }
                    ]
                };

                return (
                    <div key={company} style={{ width: "300px", margin: "20px auto" }}>
                        <h3>{company}</h3>
                        <Pie data={data} />
                    </div>
                );
            })}
        </div>
    );
};

export default PartnerChart;
