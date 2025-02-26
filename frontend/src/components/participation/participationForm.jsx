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
            const response = await axios.get("http://127.0.0.1:8000/partners/");
            setPartners(response.data);
            toast.success("Partners fetched successfully!");
        } catch (error) {
            toast.error("Failed to fetch partners!");
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/companies/");
            setCompanies(response.data);
            toast.success("Companies fetched successfully!");
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
                await axios.put(`http://127.0.0.1:8000/participations/${participationToEdit.id}/`, {
                    partner: partnerId,
                    company: companyId,
                    percentage: percentage,
                });
                toast.success("Participation edited successfully!");
            } else {
                await axios.post("http://127.0.0.1:8000/participations/", {
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
            <ul>
                <li><a href="/">Voltar</a></li>
            </ul>

            <h1>Participation</h1>

            <form onSubmit={handleSubmit}>
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
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    required
                />

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
    );
}

export default ParticipationForm;