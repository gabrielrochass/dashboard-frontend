import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/partners-history/";

export function usePartnerHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { history, loading, error };
}
