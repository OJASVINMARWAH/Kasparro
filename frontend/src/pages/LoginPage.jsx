import React, { useState } from 'react';
import '../styles/login.css';

const LoginPage = ({ onLogin, onReturnHome }) => {
  const [role, setRole] = useState('view-support');

  return (
    <div className="login-page">
      <div className="login-card">
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 10px 15px rgba(230, 81, 0, 0.3))' }}>
            <circle cx="32" cy="32" r="32" fill="#E65100" fillOpacity="0.15"/>
            <circle cx="32" cy="24" r="10" fill="#E65100"/>
            <path d="M16 52C16 43.1634 23.1634 36 32 36C40.8366 36 48 43.1634 48 52" stroke="#E65100" strokeWidth="4" strokeLinecap="round"/>
        </svg>
        <h2>Welcome Back</h2>
        <p>Access your designated workspace.</p>
        
        <div className="input-group">
            <label>ROLE ASSIGNMENT</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="view-support">Support Agent Workspace</option>
                <option value="view-customer">Customer Interface</option>
                <option value="view-merchant">Merchant Operations</option>
                <option value="view-admin">System Administrator</option>
            </select>
        </div>
        
        <div className="input-group">
            <label>WORK EMAIL</label>
            <input type="email" placeholder="user@aura.inc" defaultValue="ojasvin@aura.inc" />
        </div>
        <div className="input-group">
            <label>AUTHENTICATION</label>
            <input type="password" placeholder="••••••••" defaultValue="password" />
        </div>
        
        <button className="btn-creative login-btn" onClick={() => onLogin(role)}>
          Authenticate Flow
        </button>
        
        <p className="return-home-link" onClick={onReturnHome}>
          Return to Home
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
