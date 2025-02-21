import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState({
    companies: [],
    employees: [],
    metrics: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/companies/"),
      axios.get("http://127.0.0.1:8000/employees/"),
      axios.get("http://127.0.0.1:8000/metrics/")
    ])
      .then(([response1, response2, response3]) => {
        console.log("Companies:", response1.data);
        console.log("Employees:", response2.data);
        console.log("Metrics:", response3.data);
        setDados({
          companies: Array.isArray(response1.data) ? response1.data : [],
          employees: Array.isArray(response2.data) ? response2.data : [],
          metrics: typeof response3.data === 'object' ? response3.data : {}
        });
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Empresas</h2>
      <ul>
        {dados.companies.map((company) => (
          <li key={company.id}>
            <strong>{company.name}</strong> - {company.address}
          </li>
        ))}
      </ul>

      <h2>Funcionários</h2>
      <ul>
        {dados.employees.length > 0 ? (
          dados.employees.map((employee) => (
            <li key={employee.id}>
              {employee.firstName} - {employee.company}
            </li>
          ))
        ) : (
          <li>Não há funcionários cadastrados.</li>
        )}
      </ul>

      <h2>Métricas</h2>
      <pre>{JSON.stringify(dados.metrics, null, 2)}</pre>
    </div>
  );
}

export default App;
