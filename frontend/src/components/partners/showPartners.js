import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreatePartner from "./createPartner";

function ShowPartners() {
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/partners/");
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

    return (
        <div className="container">
            <CreatePartner 
                onCreatedLine={fetchPartners} 
                partnerToEdit={selectedPartner} 
            />

            <h1>Partners</h1>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map((partner) => (
                        <tr key={partner.id}>
                            <td>{partner.name}</td>
                            <td>{partner.cpf}</td>
                            <td>{partner.email}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setSelectedPartner(partner)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm ml-2"
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
