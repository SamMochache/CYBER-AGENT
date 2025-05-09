import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';


const badgeColor = {
  Low: 'secondary',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const LogCard = ({ log, onResponseTriggered }) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const triggerResponse = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/logs/${log.id}/respond/`);
      showToast("✅ Response triggered successfully", "success");
      onResponseTriggered();  // Refresh log list
    } catch (err){
      showToast("❌ Failed to trigger response", "danger");
    }
    setLoading(false);
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-1">{log.source_ip}</h5>
        <p className="mb-2"><small className="text-muted">{new Date(log.timestamp).toLocaleString()}</small></p>
        <p className="card-text">{log.content}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge bg-${badgeColor[log.threat_level] || 'secondary'}`}>
            {log.threat_level}
          </span>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={triggerResponse}
            disabled={loading}
          >
            {loading ? "Responding..." : "Trigger Response"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogCard;
