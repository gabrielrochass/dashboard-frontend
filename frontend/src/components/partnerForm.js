import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createPartner } from "../services/api";

const PartnerForm = () => {
    const [partner, setPartner] = useState({
        firstName: "",
        lastName: "",
        participation: "",
        company: ""
    });

    const handleChange = (e) => {
        setPartner({
            ...partner,
            [e.target.name]: e.target.name === "participation" 
                ? parseFloat(e.target.value) || ""  
                : e.target.value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPartner = { ...partner, participation: parseFloat(partner.participation) };
            await createPartner(newPartner);
            alert("Partner created successfully!");
            window.location.reload(); 
        } catch (error) {
            console.error("Error creating partner:", error);
            alert("Failed to create partner. Check the input data.");
        }
    };
     

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={partner.firstName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={partner.lastName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="participation">Participation</Label>
                <Input
                    type="text"
                    name="participation"
                    id="participation"
                    value={partner.participation}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="company">Company</Label>
                <Input
                    type="text"
                    name="company"
                    id="company"
                    value={partner.company}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <Link to="/">Back</Link>
        </Form>
    );
}

export default PartnerForm;