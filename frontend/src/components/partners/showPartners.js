import axios from "axios";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Navbar from "../navbar/navbar";
import "../tables.css";
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
            <Navbar />
            <div className="create-form">
                <CreatePartner 
                    onCreatedLine={fetchPartners} 
                    partnerToEdit={selectedPartner} 
                />
            </div>

            <h2>Filters</h2>
            <div className="filters">
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
                <button  className="reset" onClick={resetFilters}>
                    <GrPowerReset />
                </button>
            </div>

            <h1>Partners</h1>
            <table className="table">
                {partners.length === 0 ? (
                    <tr>
                        <td colSpan={5}>No partners found.</td>
                    </tr>
                ) : (
                    <>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        {partners.map((partner) => (
                            <tr key={partner.id}>
                                <td>{partner.id}</td>
                                <td>{partner.name}</td>
                                <td>{partner.cpf}</td>
                                <td>{partner.email}</td>
                                <td>
                                    <button 
                                    className="edit"
                                    onClick={() => setSelectedPartner(partner)}><MdEdit />
                                    </button>
                                    <button className="delete"  onClick={() => handleDelete(partner.id)}><MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}
            </table>
        </div>
    );
}

export default ShowPartners;
