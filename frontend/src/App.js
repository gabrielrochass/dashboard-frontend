import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState([]);

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
        companies: response1.data,
        employees: response2.data,
        metrics: response3.data
      });
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);
  

  return (
    <div>
      <h1>Dashboard</h1>
      {Array.isArray(dados) ? (
        <ul>
          {dados.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>Dados recebidos: {JSON.stringify(dados)}</p>
      )}
    </div>
  );  
}

export default App;
