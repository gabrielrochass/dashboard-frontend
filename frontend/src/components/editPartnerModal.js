import React from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EditPartnerModal = ({ isOpen, toggle, partner, handleEditChange, handleUpdate }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Partner</ModalHeader>
            <ModalBody>
                {partner && (
                    <Form>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" value={partner.firstName} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" value={partner.lastName} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="participation">Participation</Label>
                            <Input type="number" name="participation" value={partner.participation} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="company">Company</Label>
                            <Input type="text" name="company" value={partner.company} onChange={handleEditChange} />
                        </FormGroup>
                    </Form>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Save</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditPartnerModal;
