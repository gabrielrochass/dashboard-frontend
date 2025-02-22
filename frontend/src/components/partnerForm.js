import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createPartner, getPartner } from "../services/api";

const PartnerForm = () => {
    const [partner, setPartner] = useState({
        firstName: "",
        lastName: "",
        participation: "",
        company: ""
    });

    const [partners, setPartners] = useState([]);

    const fetchPartners = async () => {
        try {
            const data = await getPartner();
            setPartners(data || []); // Ensures we always have an array
        } catch (error) {
            console.error("Error fetching partners:", error);
            toast.error("Error loading partner list.");
        }
    };

    // Updated useEffect
    useEffect(() => {
        fetchPartners();
    }, []);

    const handleChange = (e) => {
        setPartner({
            ...partner,
            [e.target.name]: e.target.name === "participation"
                ? (e.target.value ? parseFloat(e.target.value) : 0) // Ensures valid number
                : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPartner(partner);
            toast.success("Partner created successfully!");
            setPartner({ firstName: "", lastName: "", participation: "", company: "" });
            await fetchPartners(); // Calls with `await` to ensure the list is updated before continuing
        } catch (error) {
            console.error("Error creating partner:", error);
            toast.error("Failed to create partner. Check the input data.");
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
                            {p.firstName} {p.lastName} - {p.company}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No partners registered.</p>
            )}
        </div>
    );
};

export default PartnerForm;
