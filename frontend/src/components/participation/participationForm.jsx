import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ParticipationForm({ onCreatedLine, participationToEdit }) {
    const [partners, setPartners] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [partnerId, setPartnerId] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [percentage, setPercentage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchPartners();
        fetchCompanies();

        if (participationToEdit) {
            setPartnerId(participationToEdit.partner);
            setCompanyId(participationToEdit.company);
            setPercentage(participationToEdit.percentage);
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [participationToEdit]);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/partners/");
            setPartners(response.data);
        } catch (error) {
            toast.error("Failed to fetch partners!");
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("https://dashboard-backend-ngl8.onrender.com/companies/");
            setCompanies(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies!");
        }
    };

    const resetForm = () => {
        setPartnerId("");
        setCompanyId("");
        setPercentage("");
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && participationToEdit?.id) {
                await axios.put(`https://dashboard-backend-ngl8.onrender.com/participations/${participationToEdit.id}/`, {
                    partner: partnerId,
                    company: companyId,
                    percentage: percentage,
                });
                toast.success("Participation edited successfully!");
            } else {
                await axios.post("https://dashboard-backend-ngl8.onrender.com/participations/", {
                    partner: partnerId,
                    company: companyId,
                    percentage: percentage,
                });
                toast.success("Participation created successfully!");
            }

            resetForm();
            onCreatedLine();
        } catch (error) {
            toast.error(`Failed to ${isEditing ? "edit" : "create"} participation!`);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h1>Participation</h1>
                </div>
                
                <div className="form-group">
                    <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
                        <option value="">Select a partner</option>
                        {partners.map((partner) => (
                            <option key={partner.id} value={partner.id}>
                                {partner.name}
                            </option>
                        ))}
                    </select>

                    <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Percentage"
                        className="form-control"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        required
                    />
                </div>
                
                <div className="button-group">
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
                </div>
            </form>
        </div>
    );
}

export default ParticipationForm;