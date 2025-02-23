import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PartnerChart = ({ partners }) => {
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedFirstName, setSelectedFirstName] = useState("");
    const [selectedLastName, setSelectedLastName] = useState("");

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

    // Filtrar os dados com base nos filtros selecionados
    const filteredCompanies = Object.keys(companies).reduce((acc, company) => {
        const filteredPartners = companies[company].filter(partner => {
            return (
                (!selectedCompany || partner.company === selectedCompany) &&
                (!selectedFirstName || partner.firstName.includes(selectedFirstName)) &&
                (!selectedLastName || partner.lastName.includes(selectedLastName))
            );
        });
        if (filteredPartners.length > 0) {
            acc[company] = filteredPartners;
        }
        return acc;
    }, {});

    return (
        <div>
            <h2>Distribuição de Participação por Empresa</h2>
            <div>
                <label htmlFor="companyFilter">Filtrar por Empresa: </label>
                <select
                    id="companyFilter"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                >
                    <option value="">Todas</option>
                    {Object.keys(companies).map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="firstNameFilter">Filtrar por Primeiro Nome: </label>
                <input
                    id="firstNameFilter"
                    value={selectedFirstName}
                    onChange={(e) => setSelectedFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastNameFilter">Filtrar por Sobrenome: </label>
                <input
                    id="lastNameFilter"
                    value={selectedLastName}
                    onChange={(e) => setSelectedLastName(e.target.value)}
                />
            </div>
            {Object.keys(filteredCompanies).map((company) => {
                const companyData = filteredCompanies[company];

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
