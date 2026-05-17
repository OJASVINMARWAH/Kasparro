import React from 'react';
import '../styles/navbar.css';

const NoirNavbar = ({ onTalkToAI, activeView, onNavClick, onSignOut, currentPage }) => {
  return (
    <nav className="noir-navbar">
      <div className="noir-logo-container">
        <div className="noir-orb"></div>
        <span className="noir-logo-text">Aura</span>
      </div>
      
      <div className="noir-nav-links">
        {(currentPage === '/dashboard' || currentPage === '/track') && (
          <>
            {activeView === 'view-customer' && <span className="noir-nav-item active" style={{ cursor: 'default' }}>Customer Portal</span>}
            {activeView === 'view-merchant' && <span className="noir-nav-item active" style={{ cursor: 'default' }}>Merchant Operations</span>}
            {activeView === 'view-support' && <span className="noir-nav-item active" style={{ cursor: 'default' }}>Support Workspace</span>}
            {activeView === 'view-admin' && <span className="noir-nav-item active" style={{ cursor: 'default' }}>System Administrator</span>}
          </>
        )}
      </div>

      <div className="noir-user-section">
        {(currentPage === '/dashboard' || currentPage === '/track') && activeView === 'view-customer' && (
          <button className="noir-talk-ai-btn" onClick={onTalkToAI}>
            <span className="noir-rec-dot"></span> Talk to AI
          </button>
        )}
        {(currentPage === '/dashboard' || currentPage === '/track') && (
          <div className="noir-avatar" onClick={onSignOut} style={{ cursor: 'pointer' }} title="Sign Out">OM</div>
        )}
      </div>
    </nav>
  );
};

export default NoirNavbar;
