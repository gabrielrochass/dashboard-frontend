import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createPartner, deletePartner, getPartner, updatePartner } from "../services/api";

const PartnerForm = () => {
    const [partner, setPartner] = useState({
        firstName: "",
        lastName: "",
        participation: "",
        company: ""
    });

    const [partners, setPartners] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false); // Estado do modal
    const [partnerToEdit, setPartnerToEdit] = useState(null); // Armazena o parceiro a ser editado

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
        setPartner({
            ...partner,
            [e.target.name]: e.target.name === "participation"
                ? (e.target.value ? parseFloat(e.target.value) : 0)
                : e.target.value
        });
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
            toast.error("Failed to create partner. Check the data.");
        }
    };

    const openEditModal = (partner) => {
        setPartnerToEdit(partner);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setPartnerToEdit(null);
    };

    const handleUpdate = async () => {
        if (!partnerToEdit) return;

        try {
            await updatePartner(partnerToEdit.id, partnerToEdit);
            toast.success("Partner updated successfully!");
            fetchPartners(); 
            closeEditModal();
        } catch (error) {
            console.error("Error updating partner:", error);
            toast.error("Failed to update partner.");
        }
    };

    const handleEditChange = (e) => {
        setPartnerToEdit({
            ...partnerToEdit,
            [e.target.name]: e.target.name === "participation"
                ? (e.target.value ? parseFloat(e.target.value) : 0)
                : e.target.value
        });
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
                    <Input type="text" name="firstName" id="firstName" value={partner.firstName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" value={partner.lastName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="participation">Participation</Label>
                    <Input type="number" name="participation" id="participation" value={partner.participation} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company</Label>
                    <Input type="text" name="company" id="company" value={partner.company} onChange={handleChange} />
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

            <Modal isOpen={isEditModalOpen} toggle={closeEditModal}>
                <ModalHeader toggle={closeEditModal}>Edit Partner</ModalHeader>
                <ModalBody>
                    {partnerToEdit && (
                        <Form>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="text" name="firstName" id="firstName" value={partnerToEdit.firstName} onChange={handleEditChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input type="text" name="lastName" id="lastName" value={partnerToEdit.lastName} onChange={handleEditChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="participation">Participation</Label>
                                <Input type="number" name="participation" id="participation" value={partnerToEdit.participation} onChange={handleEditChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input type="text" name="company" id="company" value={partnerToEdit.company} onChange={handleEditChange} />
                            </FormGroup>
                        </Form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Save</Button>{' '}
                    <Button color="secondary" onClick={closeEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default PartnerForm;
