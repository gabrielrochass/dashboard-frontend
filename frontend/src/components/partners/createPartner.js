import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
                await axios.put(`http://127.0.0.1:8000/partners/${partnerToEdit.id}/`, {
                    name,
                    cpf,
                    email,
                });
                toast.success("Partner edited successfully!");
            } else {
                await axios.post("http://127.0.0.1:8000/partners/", {
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
            <ul>
                <li><a href="/">Voltar</a></li>
            </ul>
            
            <div className="title">
                <h1>{isEditing ? "Edit Partner" : "Create Partner"}</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CPF</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {isEditing ? (
                            <div>
                                <button type="submit" className="save-changes btn">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="cancel btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button type="submit" className="create btn">
                                Create Partner
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePartner;
