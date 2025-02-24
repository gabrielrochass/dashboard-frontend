import React, { useEffect, useState } from "react";
import PartnerForm from "../components/partnerForm/partnerForm";
import { getPartner } from "../services/api";

const Dashboard = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            const data = await getPartner();
            setPartners(data || []);
        };
        fetchPartners();
    }, []);

    return (
        <div>
            <PartnerForm />
        </div>
    );
};

export default Dashboard;
