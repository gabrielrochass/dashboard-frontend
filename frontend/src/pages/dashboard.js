import React, { useEffect, useState } from "react";
import PartnerChart from "../components/partnerChart/partnerChart";
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
            <PartnerChart partners={partners} />
        </div>
    );
};

export default Dashboard;
