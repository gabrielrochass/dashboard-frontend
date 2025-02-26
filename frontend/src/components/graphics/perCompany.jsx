import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function PerCompany() {
    const [company, setCompany] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [data, setData] = useState(null);
    const [participations, setParticipations] = useState([]);

    useEffect(() => {
        fetchCompanies();
        fetchParticipations();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/companies/");
            setCompany(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies!");
        }
    };

    const fetchParticipations = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/participations/");
            setParticipations(response.data);
        } catch (error) {
            toast.error("Failed to fetch participations!");
        }
    };

    const fetchCompanyData = async (companyId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/company-stats/${companyId}/`);
            setData(response.data);
        } catch (error) {
            toast.error("Failed to fetch company data!");
        }
    };

    const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

    const groupedByPartner = participations
        .filter(p => p.company === Number(selectedCompany))
        .reduce((acc, p) => {
            if (!acc[p.partnerName]) {
                acc[p.partnerName] = [];
            }
            acc[p.partnerName].push({ name: p.companyName, value: parseFloat(p.percentage) });
            return acc;
        }, {});

    return (
        <div className="per-company-container">
            <h2 className="per-company-title">Per Company</h2>
            <select
                onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    fetchCompanyData(e.target.value);
                }}
            >
                <option value="">Select a company</option>
                {company.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
            {data && (
                <div className="chart-section">
                    <h4 className="chart-subtitle">{data.company}</h4>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={Object.keys(groupedByPartner).map((partner) => {
                                    const totalParticipation = groupedByPartner[partner].reduce((sum, p) => sum + p.value, 0);
                                    return {
                                        name: partner,
                                        value: totalParticipation,
                                    };
                                }).concat({
                                    name: "unsigned",
                                    value: 100 - Object.keys(groupedByPartner).reduce((sum, partner) => sum + groupedByPartner[partner].reduce((sum, p) => sum + p.value, 0), 0)
                                })}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                            >
                                {Object.keys(groupedByPartner).map((partner, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <Cell key="cell-unsigned" fill="gray" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default PerCompany;

