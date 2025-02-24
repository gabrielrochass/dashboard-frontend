import React from "react";
import { usePartnerHistory } from "../../services/history";

export default function PartnerHistory() {
  const { history, loading, error } = usePartnerHistory();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar histórico.</p>;

  return (
    <div>
      <h2>Histórico de Participação</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>Participação Anterior</th>
            <th>Nova Participação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.company}</td>
              <td>{item.previousParticipation}%</td>
              <td>{item.newParticipation}%</td>
              <td>{new Date(item.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
