import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function CreatePartner() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

    const createPartner = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/partners/", {
                name,
                cpf,
                email,
            });
            toast.success("Partner created successfully!");
            setName("");
            setCpf("");
            setEmail("");
        } catch (error) {
            toast.error("Failed to create partner!");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={createPartner}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create Partner
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

};
export default CreatePartner;