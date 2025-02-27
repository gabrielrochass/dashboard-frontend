import axios from "axios";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Navbar from "../navbar/navbar";
import CreateCompany from "./createCompany";

function ShowCompany() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [filters, setFilters] = useState({ name: "", cnpj: "", address: "" });

    useEffect(() => {
        fetchCompanies();
    }, [filters]);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/companies/", {
                params: filters,
            });
            setCompanies(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://dashboard-backend-ngl8.onrender.com/companies/${id}/`);
            toast.success("Company deleted successfully!");
            fetchCompanies();
        } catch (error) {    
            toast.error("Failed to delete company!");
        }
    };

    const handleFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({ name: "", cnpj: "", address: "" });
        fetchCompanies();
    };

    return (
        <div className="container">
            <Navbar />
            <CreateCompany 
                onCreatedLine={fetchCompanies}
                companyToEdit={selectedCompany}
            />


            <h2>Filters</h2>
            <div className="filters">
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilter}
                    placeholder="Name"
                    />
                <input
                    type="text"
                    name="cnpj"
                    value={filters.cnpj}
                    onChange={handleFilter}
                    placeholder="CNPJ"
                />
                <input
                    type="text"
                    name="address"
                    value={filters.address}
                    onChange={handleFilter}
                    placeholder="Address"
                />
                <button className="reset"onClick={resetFilters}><GrPowerReset />
                </button>
            </div>

            <h1>Companies</h1>
            <table className="table">
               {companies.length === 0 ? (
                   <tr>
                        <td>No companies found!</td>
                    </tr>
                ) : (
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>CNPJ</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                )}
                {companies.map((company) => (
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.cnpj}</td>
                        <td>{company.address}</td>
                        <td>
                            <button className="edit" onClick={() => setSelectedCompany(company)}><MdEdit />
                            </button>
                            
                            <button 
                            className="delete"
                            onClick={() => handleDelete(company.id)}><MdDelete />
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default ShowCompany;

        