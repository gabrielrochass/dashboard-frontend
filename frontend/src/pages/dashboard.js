import { useEffect, useState } from "react";
import {
    createCompany,
    deleteCompany,
    getCompanies,
    getEmployees,
    getMetrics
} from "../services/api";

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Função para buscar os dados da API
  const fetchData = async () => {
    const companiesData = await getCompanies();
    const employeesData = await getEmployees();
    const metricsData = await getMetrics();

    setCompanies(companiesData);
    setEmployees(employeesData);
    setMetrics(metricsData);
  };

  // Criar uma nova empresa
  const handleCreateCompany = async () => {
    if (!newCompanyName) return;
    const newCompany = await createCompany({ name: newCompanyName, address: "Endereço Padrão" });
    if (newCompany) {
      fetchData(); // Atualizar os dados após criar
      setNewCompanyName("");
    }
  };

  // Excluir uma empresa
  const handleDeleteCompany = async (companyId) => {
    const success = await deleteCompany(companyId);
    if (success) fetchData(); // Atualizar os dados após deletar
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <h2>Empresas</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} - {company.address}
            <button onClick={() => handleDeleteCompany(company.id)}>🗑️ Excluir</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nome da empresa"
        value={newCompanyName}
        onChange={(e) => setNewCompanyName(e.target.value)}
      />
      <button onClick={handleCreateCompany}>Adicionar Empresa</button>

      <h2>Funcionários</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.firstName} - {employee.company}</li>
        ))}
      </ul>

      <h2>Métricas</h2>
      <ul>
        <li>Total Empresas: {metrics["Total Companies"]}</li>
        <li>Total Funcionários: {metrics["Total Employees"]}</li>
        <li>Média Funcionários/Empresa: {metrics["Average Employees per Company"]}</li>
      </ul>
    </div>
  );
}

export default Dashboard;
