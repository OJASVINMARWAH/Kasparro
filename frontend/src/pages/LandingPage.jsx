import React from 'react';
import '../styles/landing.css';

const LandingPage = ({ onEnterPortal }) => {
  return (
    <div className="landing-page">
      <div className="hero-showcase">
        <div className="glass-element glass-ring"></div>
        
        <div className="glass-element glass-card-1">
          <div className="sheen-layer"></div>
          <div className="glass-accent"></div>
          <div className="glass-line" style={{ top: '6rem', width: '60%' }}></div>
          <div className="glass-line" style={{ top: '8rem', width: '40%', opacity: 0.5 }}></div>
          <div className="glass-line" style={{ bottom: '3rem', width: '80%', height: '60px', background: 'rgba(255,255,255,0.4)' }}></div>
        </div>
        
        <div className="glass-element glass-card-2">
          <div className="sheen-layer"></div>
          <div className="glass-accent" style={{ background: 'var(--accent-secondary)', right: '2rem', left: 'auto' }}></div>
          <div className="glass-line" style={{ top: '3rem', width: '50%', height: '4px' }}></div>
          <div className="glass-line" style={{ top: '5rem', width: '70%', height: '4px', opacity: 0.5 }}></div>
        </div>
      </div>
      
      <div className="landing-text-center">
        <div className="elegant-badge">Introducing Aura OS 2.0</div>
        <h1 className="typewriter-text active">Resolve Claims.</h1>
        <p>
          The premium intelligence platform unifying customers, merchants, and support teams seamlessly into one workspace.
        </p>
        <button className="btn-creative" onClick={onEnterPortal}>
          Enter Portal
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
