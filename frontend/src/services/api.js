import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Função para buscar todas as empresas
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return [];
  }
};

// Função para buscar todos os funcionários
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return [];
  }
};

// Função para buscar métricas
export const getMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/metrics/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
    return {};
  }
};

// Criar uma nova empresa
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_URL}/companies/`, companyData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    return null;
  }
};

// Atualizar empresa
export const updateCompany = async (companyId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/companies/${companyId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    return null;
  }
};

// Excluir empresa
export const deleteCompany = async (companyId) => {
  try {
    await axios.delete(`${API_URL}/companies/${companyId}/`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir empresa:", error);
    return false;
  }
};
