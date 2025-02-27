import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/companies/");
            setCompany(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies!");
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

    const fetchCompanyData = async (companyId) => {
        try {
            const response = await axios.get(`https://dashboard-backend-ngl8.onrender.com/company-stats/${companyId}/`);
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
            <div className="select-container">
                <select
                    onChange={(e) => {
                        setSelectedCompany(e.target.value);
                        fetchCompanyData(e.target.value);
                    }}
                    className="partner-select"
                >
                    <option value="">Select a company</option>
                    {company.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            {data && (
                <div className="chart-section3">
                    <div className="highlight-container" id="meu-elemento">
                        <h3> Total Partners: 
                        <div className="highlight-company">
                            <span>{data.totalPartners}</span>
                        </div>
                        </h3>
                        <h3> Average Participation:
                        <div className="highlight-company">
                            <span>{data.avgParticipation.toFixed(2)}%</span>
                        </div>
                        </h3>
                    </div>

                    <div className="pie2">
                        <h4> Partners Participations in {data.company}</h4>
                        <ResponsiveContainer width={400} height={300}>
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
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ name, percent }) => `${(percent * 100).toFixed(2)}%`}
                                >
                                    {Object.keys(groupedByPartner).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <Cell key="cell-unsigned" fill="gray" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Top Partners</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                                data={data.topPartners || []}
                                layout="vertical"
                                margin={{ left: 0, right: 20 }}
                            >
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="partner" width={150} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="percentage" fill={COLORS[0]}>
                                    {data.topPartners?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
        )}
    </div>
    );
}
export default PerCompany;


