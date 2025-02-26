import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ParticipationForm from "./participationForm";

function ParticipationTable() {
    const [participations, setParticipations] = useState([]);
    const [participationToEdit, setParticipationToEdit] = useState(null);
    const [partners, setPartners] = useState([]);
    const [companies, setCompanies] = useState([]);
    
    const fetchPartnersAndCompanies = async () => {
        try {
            const partnersResponse = await axios.get("http://127.0.0.1:8000/partners/");
            const companiesResponse = await axios.get("http://127.0.0.1:8000/companies/");
            setPartners(partnersResponse.data);
            setCompanies(companiesResponse.data);
        } catch (error) {
            toast.error("Failed to fetch partners and companies!");
        }
    };

    const [filters, setFilters] = useState({ partner: "", company: "", percentage: "" });

    const fetchParticipations = async () => {
        try {
            await fetchPartnersAndCompanies();
            const response = await axios.get("http://127.0.0.1:8000/participations/", {
                params: filters,
            });
            setParticipations(response.data);
        } catch (error) {
            toast.error("Failed to fetch participations!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/participations/${id}/`);
            toast.success("Participation deleted successfully!");
            fetchParticipations();
        } catch (error) {
            toast.error("Failed to delete participation!");
        }
    };

    const handleFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({ partner: "", company: "", percentage: "" });
        fetchParticipations();
    };

    useEffect(() => {
        fetchParticipations();
    }
    , [filters]);

    return ( 
        <div className="container">
            <ParticipationForm 
                onCreatedLine={fetchParticipations} 
                participationToEdit={participationToEdit} 
            />

            <h1>Participations</h1>

            <div className="filters">
                <h2>Filters</h2>
                <select name="partner" value={filters.partner} onChange={handleFilter}>
                    <option value="">Select a partner</option>
                    {partners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                            {partner.name}
                        </option>
                    ))}
                </select>
                <select name="company" value={filters.company} onChange={handleFilter}>
                    <option value="">Select a company</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="percentage"
                    value={filters.percentage}
                    onChange={handleFilter}
                    placeholder="Percentage"
                />
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

        <table className="table">
            {participations.length === 0 ? (
                <tr>
                    <td colSpan={5}>No participations found.</td>
                </tr>
            ) : (
                <tr>
                    <th></th>
                    <th>Partner</th>
                    <th>Company</th>
                    <th>Percentage</th>
                    <th>Actions</th>
                </tr>
            )}
            {participations.map((participation) => (
                <tr key={participation.id}>
                    <td>{participation.id}</td>
                    <td>{participation.partnerName}</td>
                    <td>{participation.companyName}</td>
                    <td>{participation.percentage}</td>
                    <td>
                        <button onClick={() => setParticipationToEdit(participation)}>Edit</button>
                        <button onClick={() => handleDelete(participation.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </table>
    </div>
);
}

export default ParticipationTable;
        
