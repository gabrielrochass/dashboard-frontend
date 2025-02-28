import axios from "axios";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Navbar from "../navbar/navbar";
import ParticipationForm from "./participationForm";

function ParticipationTable() {
    const [participations, setParticipations] = useState([]);
    const [participationToEdit, setParticipationToEdit] = useState(null);
    const [partners, setPartners] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filters, setFilters] = useState({ partner: "", company: "", percentage: "" });
    
    const fetchPartnersAndCompanies = async () => { // async porque faz requisição
        try {
            // await para esperar a resposta da requisição
            const partnersResponse = await axios.get("https://dashboard-backend-ngl8.onrender.com/partners/");
            const companiesResponse = await axios.get("https://dashboard-backend-ngl8.onrender.com/companies/");
            setPartners(partnersResponse.data);
            setCompanies(companiesResponse.data);
        } catch (error) {
            toast.error("Failed to fetch partners and companies!");
        }
    };

    const fetchParticipations = async () => {
        try {
            await fetchPartnersAndCompanies();
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/participations/", {
                params: filters,
            });
            setParticipations(response.data);
        } catch (error) {
            toast.error("Failed to fetch participations!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://dashboard-backend-ngl8.onrender.com/participations/${id}/`);
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
            <Navbar />
            <ParticipationForm 
                onCreatedLine={fetchParticipations} 
                participationToEdit={participationToEdit} 
            />


            <h2>Filters</h2>
            <div className="filters">
                <input
                    type="text"
                    name="partner"
                    value={filters.partner}
                    onChange={handleFilter}
                    placeholder="Partner"
                    />
                <input
                    type="text"
                    name="company"
                    value={filters.company}
                    onChange={handleFilter}
                    placeholder="Company"
                    />
                <input
                    type="number"
                    name="percentage"
                    value={filters.percentage}
                    onChange={handleFilter}
                    placeholder="Percentage"
                    />
                <button className="reset"
                onClick={resetFilters}><GrPowerReset />
                </button>
            </div>

        <h1>Participations</h1>
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
                        <button 
                        className="edit"
                        onClick={() => setParticipationToEdit(participation)}><MdEdit />
                        </button>
                        <button 
                        className="delete"
                        onClick={() => handleDelete(participation.id)}><MdDelete />
                        </button>
                    </td>
                </tr>
            ))}
        </table>
    </div>
);
}

export default ParticipationTable;
        
