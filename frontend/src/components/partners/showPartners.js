// mostra a lista de parceiros
// GET -> guarda em um useState -> renderiza a lista

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ShowPartners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => { 
        getPartners();
    }, []);

    const getPartners = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/partners/");
            setPartners(response.data);
        } catch (error) {
            toast.error("Failed to fetch partners!");
        }
    };

    return (
        <div className="container">
            <div className="title">
                <h1>Partners</h1>
            </div>

            {/* <CreatePartner onCreatedLine={getPartners} /> */}

            <div className="row">
                <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CPF</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map((partner) => (
                                <tr key={partner.id}>
                                    <td>{partner.name}</td>
                                    <td>{partner.cpf}</td>
                                    <td>{partner.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ShowPartners;
