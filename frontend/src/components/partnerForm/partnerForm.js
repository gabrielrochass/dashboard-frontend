import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPartner, deletePartner, getPartner, updatePartner } from "../../services/api.js";
import PartnerChart from "../partnerChart/partnerChart";
import "./partnerForm.css";

const PartnerForm = () => {
    const [partner, setPartner] = useState({ firstName: "", lastName: "", participation: "", company: "" });
    const [partners, setPartners] = useState([]);
    const [editingId, setEditingId] = useState(null); // Para armazenar o parceiro em edição

    // Função para buscar parceiros
    const fetchPartners = async () => {
        try {
            const data = await getPartner();
            setPartners(data || []);
        } catch (error) {
            console.error("Error fetching partners:", error);
            toast.error("Error loading partner list.");
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleChange = (e) => {
        setPartner({ ...partner, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Atualizar parceiro existente
                await updatePartner(editingId, partner);
                toast.success("Partner updated successfully!");
                setEditingId(null);
            } else {
                // Criar novo parceiro
                await createPartner(partner);
                toast.success("Partner created successfully!");
            }

            setPartner({ firstName: "", lastName: "", participation: "", company: "" });
            fetchPartners(); // Atualizar a lista
        } catch (error) {
            console.error("Error submitting partner:", error);
            toast.error("Failed to submit partner.");
        }
    };

    const handleEdit = (partner) => {
        setPartner(partner);
        setEditingId(partner.id);
    };

    const handleDelete = async (id) => {
        try {
            await deletePartner(id);
            toast.success("Partner deleted successfully!");
            fetchPartners(); // Atualizar a lista
        } catch (error) {
            console.error("Error deleting partner:", error);
            toast.error("Failed to delete partner.");
        }
    };

    return (
        <div className="form-container">
            <form className="form-navbar" onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={partner.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={partner.lastName} onChange={handleChange} />
                <input type="number" name="participation" placeholder="Participation" value={partner.participation} onChange={handleChange} />
                <input type="text" name="company" placeholder="Company" value={partner.company} onChange={handleChange} />
                <button className="button-submit" type="submit">
                    {editingId ? "Update" : "Submit"}
                </button>
            </form>

            <div className="partner-list">
                <h2>Lista de Parceiros</h2>
                {partners.length > 0 ? (
                    <table className="partner-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Participação (%)</th>
                                <th>Empresa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.firstName}</td>
                                    <td>{p.lastName}</td>
                                    <td>{p.participation}</td>
                                    <td>{p.company}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(p)}>Editar</button>
                                        <button className="delete-btn" onClick={() => handleDelete(p.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum parceiro cadastrado.</p>
                )}
            </div>
            <PartnerChart partners={partners} />
        </div>
    );
};

export default PartnerForm;
