import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogCard from '../components/LogCard';

const API_BASE = 'http://localhost:8000/api';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get(`${API_BASE}/logs/`);
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Cyber Threat Logs</h2>
      <div className="row">
        {logs.map(log => (
          <div className="col-md-6 col-lg-4 mb-3" key={log.id}>
            <LogCard log={log} onResponseTriggered={fetchLogs} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
