import axios from "axios";

const API_URL = "https://dashboard-backend-ngl8.onrender.com/"; 

export const getPartner = async () => {
    try {
        const response = await axios.get(`${API_URL}/partners/`); 
        return response.data;
    } catch (error) {
        console.error("Error getting partners:", error);
        throw error;
    }
};

export const createPartner = async (partner) => {
    try {
        const response = await axios.post(`${API_URL}/partners/`, partner, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating partner:", error.response?.data || error.message);
        throw error;
    }
};


export const deletePartner = async (partnerId) => {
    try {
        const response = await axios.delete(`${API_URL}/partners/${partnerId}/`); 
        return response.data;
    } catch (error) {
        console.error("Error deleting partner:", error);
        throw error;
    }
};

export const updatePartner = async (partnerId, partner) => {
    try {
        const response = await axios.put(`${API_URL}/partners/${partnerId}/`, partner, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating partner:", error.response?.data || error.message);
        throw error;
    }
}
