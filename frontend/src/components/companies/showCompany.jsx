import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
            const response = await axios.get("http://127.0.0.1:8000/companies/", {
                params: filters,
            });
            setCompanies(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/companies/${id}/`);
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
            <CreateCompany 
                onCreatedLine={fetchCompanies}
                companyToEdit={selectedCompany}
            />

            <h1>Companies</h1>

            <div className="filters">
                <h2>Filters</h2>
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
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

            <table>
               {companies.length === 0 ? (
                    <tr>
                        <td>No companies found!</td>
                    </tr>
                ) : (
                    <tr>
                        <th>Name</th>
                        <th>CNPJ</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                )}
                {companies.map((company) => (
                    <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.cnpj}</td>
                        <td>{company.address}</td>
                        <td>
                            <button onClick={() => setSelectedCompany(company)}>Edit</button>
                            <button onClick={() => handleDelete(company.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default ShowCompany;

        