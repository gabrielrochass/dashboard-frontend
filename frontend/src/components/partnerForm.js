import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createPartner, deletePartner, getPartner, updatePartner } from "../services/api";
import EditPartnerModal from "./editPartnerModal.js";

const PartnerForm = () => {
    const [partner, setPartner] = useState({ firstName: "", lastName: "", participation: "", company: "" });
    const [partners, setPartners] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const data = await getPartner();
            setPartners(data || []);
        } catch (error) {
            console.error("Error fetching partners:", error);
            toast.error("Error loading partner list.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartner((prev) => ({
            ...prev,
            [name]: name === "participation" ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPartner(partner);
            toast.success("Partner created successfully!");
            setPartner({ firstName: "", lastName: "", participation: "", company: "" });
            fetchPartners();
        } catch (error) {
            console.error("Error creating partner:", error);
            toast.error("Failed to create partner.");
        }
    };

    const openEditModal = (partner) => {
        setSelectedPartner(partner);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedPartner(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedPartner((prev) => ({
            ...prev,
            [name]: name === "participation" ? parseFloat(value) || 0 : value
        }));
    };

    const handleUpdate = async () => {
        if (!selectedPartner) return;
        try {
            await updatePartner(selectedPartner.id, selectedPartner);
            toast.success("Partner updated successfully!");
            fetchPartners();
            closeEditModal();
        } catch (error) {
            console.error("Error updating partner:", error);
            toast.error("Failed to update partner. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePartner(id);
            toast.success("Partner deleted successfully!");
            fetchPartners();
        } catch (error) {
            console.error("Error deleting partner:", error);
            toast.error("Failed to delete partner.");
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" value={partner.firstName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" value={partner.lastName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="participation">Participation</Label>
                    <Input type="number" name="participation" value={partner.participation} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company</Label>
                    <Input type="text" name="company" value={partner.company} onChange={handleChange} />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>

            <h2>Partner List</h2>
            {partners.length > 0 ? (
                <ul>
                    {partners.map((p) => (
                        <li key={p.id}>
                            {p.firstName} {p.lastName} - {p.participation} - {p.company}
                            <Button color="warning" size="sm" onClick={() => openEditModal(p)} style={{ marginLeft: "10px" }}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" onClick={() => handleDelete(p.id)} style={{ marginLeft: "10px" }}>
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No partners registered.</p>
            )}

            <EditPartnerModal
                isOpen={isEditModalOpen}
                toggle={closeEditModal}
                partner={selectedPartner}
                handleEditChange={handleEditChange}
                handleUpdate={handleUpdate}
            />
        </div>
    );
};

export default PartnerForm;
