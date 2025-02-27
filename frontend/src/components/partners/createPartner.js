import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../tables.css";

function CreatePartner({ onCreatedLine, partnerToEdit }) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (partnerToEdit) {
            setName(partnerToEdit.name || "");
            setCpf(partnerToEdit.cpf || "");
            setEmail(partnerToEdit.email || "");
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [partnerToEdit]);

    const resetForm = () => {
        setName("");
        setCpf("");
        setEmail("");
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && partnerToEdit?.id) {
                await axios.put(`https://dashboard-backend-ngl8.onrender.com/partners/${partnerToEdit.id}/`, {
                    name,
                    cpf,
                    email,
                });
                toast.success("Partner edited successfully!");
            } else {
                await axios.post("https://dashboard-backend-ngl8.onrender.com/partners/", {
                    name,
                    cpf,
                    email,
                });
                toast.success("Partner created successfully!");
            }
            
            resetForm();
            onCreatedLine(); 
        } catch (error) {
            toast.error(`Failed to ${isEditing ? "edit" : "create"} partner!`);
            toast.error(error.response);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h1>{isEditing ? "Edit Partner" : "Create Partner"}</h1>
                </div>
                
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>  

                <div className="button-group">
                    {isEditing ? (
                        <>
                            <button type="submit" className="save-changes btn">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="cancel btn"
                                onClick={resetForm}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button type="submit" className="create btn">
                            Create Partner
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreatePartner;
