import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreatePartner from "./createPartner";

function ShowPartners() {
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [filters, setFilters] = useState({ name : "", cpf : "", email : "" });

    useEffect(() => {
        fetchPartners();
    }, [filters]);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/partners/", {
                params: filters,
            });
            setPartners(response.data);
        } catch (error) {
            toast.error("Failed to fetch partners!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/partners/${id}/`);
            toast.success("Partner deleted successfully!");
            fetchPartners(); 
        } catch (error) {
            toast.error("Failed to delete partner!");
        }
    };

    const handleFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({ name : "", cpf : "", email : "" });
        fetchPartners();
    };

    return (
        <div className="container">
            <CreatePartner 
                onCreatedLine={fetchPartners} 
                partnerToEdit={selectedPartner} 
            />

            <h1>Partners</h1>

            <div className="filters">
                <h2>Filters</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={filters.name}
                    onChange={handleFilter}
                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={filters.cpf}
                    onChange={handleFilter}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={filters.email}
                    onChange={handleFilter}
                />
                <button onClick={resetFilters}>Reset Filters</button>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map((partner) => (
                        <tr key={partner.id}>
                            <td>{partner.id}</td>
                            <td>{partner.name}</td>
                            <td>{partner.cpf}</td>
                            <td>{partner.email}</td>
                            <td>
                                <button 
                                    className="edit btn"
                                    onClick={() => setSelectedPartner(partner)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete btn"
                                    onClick={() => handleDelete(partner.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowPartners;
