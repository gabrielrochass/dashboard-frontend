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
            onCreatedLine(); // Atualiza a lista apenas após o sucesso
        } catch (error) {
            toast.error(`Failed to ${isEditing ? "edit" : "create"} partner!`);
        }
    };

    return (
        <div className="container">
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

                        {/* Botão de Criar */}
                        {!isEditing && (
                            <button type="submit" className="btn btn-success">
                                Create Partner
                            </button>
                        )}

                        {/* Botão de Editar */}
                        {isEditing && (
                            <>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ml-2"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePartner;
