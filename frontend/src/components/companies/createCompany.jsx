import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CreateCompany({ onCreatedLine, companyToEdit }) {
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (companyToEdit) {
            setName(companyToEdit.name || "");
            setCnpj(companyToEdit.cnpj || "");
            setAddress(companyToEdit.address || "");
            setIsEditing(true);
        } else {
            resetForm();
        }
    }
    , [companyToEdit]);

    const resetForm = () => {
        setName("");
        setCnpj("");
        setAddress("");
        setIsEditing(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && companyToEdit?.id) {
                await axios.put(`http://127.0.0.1:8000/companies/${companyToEdit.id}/`, {
                    name,
                    cnpj,
                    address,
                });
                toast.success("Company edited successfully!");
            } else {
                await axios.post("http://127.0.0.1:8000/companies/", {
                    name,
                    cnpj,
                    address,
                });
                toast.success("Company created successfully!");
            } 
    
            resetForm();
            onCreatedLine();
        } catch (error) {
            toast.error(`Failed to ${isEditing ? "edit" : "create"} company!`);
        }
    };
    

    return (
        <div className="container">
            <div className="title">
                <h1>{isEditing ? "Edit Company" : "Create Company"}</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>CNPJ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                {isEditing ? (
                    <div>
                        <button type="submit" className="save-changes btn">
                            Save Changes
                        </button>
                        <button type="button" className="cancel btn" onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button type="submit" className="create btn">
                        Create Company
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreateCompany;