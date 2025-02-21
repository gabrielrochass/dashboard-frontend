import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/companies/")
      .then(response => {
        console.log("Dados recebidos:", response.data); // 🔍 Ver no console
        setDados(response.data);
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
