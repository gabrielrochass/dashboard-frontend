import { useEffect, useState } from "react";
import PartnerForm from "../components/partnerForm";
import {
    deletePartner,
    getPartner
} from "../services/api";

const Dashboard = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            const partners = await getPartner();
            setPartners(partners);
        };
        fetchPartners();
    }, []);

    const handleDelete = async (partnerId) => {
        await deletePartner(partnerId);
        const partners = await getPartner();
        setPartners(partners);
    };

    return (
        <div>
            <PartnerForm />
            <ul>
                {partners.map((partner) => (
                    <li key={partner.id}>
                        {partner.firstName} {partner.lastName} - {partner.company} - {partner.participation}%
                        <button onClick={() => handleDelete(partner.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;