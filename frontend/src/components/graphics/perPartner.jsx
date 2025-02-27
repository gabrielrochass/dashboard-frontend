import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function PerPartner({ selectedPartner, setSelectedPartner }) {
    const [partners, setPartners] = useState([]);
    const [data, setData] = useState(null);
    const [participations, setParticipations] = useState([]);

    useEffect(() => {
        fetchPartners();
        fetchParticipations();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/partners/");
            setPartners(response.data);
        } catch (error) {
            toast.error("Failed to fetch partners!");
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

    const fetchPartnerData = async (partnerId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/partner-stats/${partnerId}/`);
            setData(response.data);
        } catch (error) {
            toast.error("Failed to fetch partner data!");
        }
    };

    const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

    const groupedByCompany = participations
        .filter(p => p.partner === Number(selectedPartner))
        .reduce((acc, p) => {
            if (!acc[p.companyName]) {
                acc[p.companyName] = [];
            }
            acc[p.companyName].push({ name: p.partnerName, value: parseFloat(p.percentage) });
            return acc;
        }, {});

    return (
        <div className="dashboard">
            <div className="select-container">
                <select
                    onChange={(e) => {
                        setSelectedPartner(e.target.value);
                        fetchPartnerData(e.target.value);
                    }}
                    className="partner-select"
                >
                    <option value="">Select a partner</option>
                    {partners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                            {partner.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="dashboard-charts">
                {data && (
                    <div className="chart-container2">
                        <div className="highlight-container"id="2">
                            <h3>Most Company Participation:
                                <div className="highlight-company">
                                    <span>{data.mostParticipation}</span>
                                </div>
                            </h3>
                            <h3>Least Company Participation:
                                <div className="highlight-company">
                                    <span>{data.leastParticipation}</span>
                                </div>
                            </h3>
                        </div>
                        
                        <div className="bar">
                            <h4> Company Participation</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={Object.keys(groupedByCompany).map(company => ({ name: company, value: groupedByCompany[company].reduce((sum, p) => sum + p.value, 0) }))} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="pie">
                            {Object.keys(groupedByCompany).map((company, index) => {
                                const totalParticipation = groupedByCompany[company].reduce((sum, p) => sum + p.value, 0);
                                const remaining = totalParticipation < 100 ? 100 - totalParticipation : 0;

                                const data = [
                                    ...groupedByCompany[company],
                                    remaining > 0 ? { name: "Others", value: remaining } : null
                                ].filter(Boolean);

                                return (
                                    <div key={index} className="company-participation-container">
                                        <h4>Participations in {company}</h4>
                                        <ResponsiveContainer width={300} height={240}>
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
                                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerPartner;
