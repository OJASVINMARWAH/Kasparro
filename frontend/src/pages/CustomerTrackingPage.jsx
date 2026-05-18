import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/customerTracking.css';
import LiveSupportPage from './LiveSupportPage';

const CustomerTrackingPage = ({ selectedCase }) => {
    const navigate = useNavigate();
    const [showLiveSupport, setShowLiveSupport] = useState(false);
    // If no case is found in state, fall back or redirect
    if (!selectedCase) {
        return (
            <div className="tracking-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#3E2723' }}>No Active Claim Found</h2>
                <button onClick={() => navigate('/claim')} style={{ padding: '1rem 2rem', background: '#E65100', color: '#fff', border: 'none', borderRadius: '100px', cursor: 'pointer', fontWeight: 800 }}>
                    Submit a New Claim
                </button>
            </div>
        );
    }

    return (
        <div className="tracking-page-wrapper">
            <div className="grid-layer"></div>
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>

            <div className="tracking-container">

                <div className="tracking-header">
                    <h1>Claim Tracking Portal</h1>
                    <p>Track the live status of your submission processed by Aura OS.</p>
                </div>

                <div className="tracking-grid">

                    {/* LEFT COLUMN */}
                    <div className="tracking-card">
                        <div className="tracking-meta-title">ORDER ID</div>
                        <div className="tracking-value">{selectedCase.orderId || '---'}</div>

                        <div className="tracking-meta-title">WORKFLOW STATUS</div>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="status-badge">{selectedCase.workflowStatus || 'RECEIVED'}</span>
                        </div>

                        <div className="tracking-meta-title">AI TRUST SCORE</div>
                        <div className="tracking-value" style={{ marginBottom: '0.5rem' }}>
                            {Math.round((selectedCase.confidenceScore || 0) * 100)}%
                        </div>
                        <div className="tracking-trust-track">
                            <div
                                className="tracking-trust-fill"
                                style={{ width: `${Math.round((selectedCase.confidenceScore || 0) * 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* CENTER COLUMN */}
                    <div className="tracking-card" style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.85)' }}>
                        <div className="tracking-meta-title" style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1rem' }}>LIVE JOURNEY</div>

                        <div className="tracking-timeline">
                            {selectedCase.eventStream && selectedCase.eventStream.length > 0 ? (
                                selectedCase.eventStream.map((event, index) => (
                                    <div key={index} className="tracking-timeline-item">
                                        <div className={`tracking-dot ${index === 0 ? 'active' : ''}`}></div>
                                        <div className="tracking-time">
                                            {new Date(event.eventTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="tracking-event">{event.eventMessage}</div>
                                        <div className="tracking-actor">{event.actor}</div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: '#8D6E63', fontWeight: 600 }}>Awaiting timeline generation...</div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="tracking-card dark-card">
                        <div className="tracking-meta-title">EXPECTED SLA</div>
                        <div className="tracking-value">24 Hours</div>

                        <div className="tracking-meta-title">CLAIMED DAMAGE</div>
                        <div className="tracking-value" style={{ fontSize: '1.2rem' }}>
                            {selectedCase.claimedDamage || 'Unspecified'}
                        </div>

                        <div className="tracking-meta-title" style={{ marginTop: '3rem' }}>AI RECOMMENDATION</div>
                        <div className="tracking-value large">
                            {selectedCase.agentResults?.recommendation?.decision || 'Pending'}
                        </div>
                        {selectedCase.agentResults?.recommendation?.reasoning && (
                            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
                                {selectedCase.agentResults.recommendation.reasoning}
                            </p>
                        )}
                        <button
                            onClick={() => setShowLiveSupport(true)}
                            style={{
                                marginTop: '2rem',
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '16px',
                                border: 'none',
                                background: '#E65100',
                                color: '#fff',
                                fontWeight: 800,
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            TALK TO AI AGENT
                        </button>
                    </div>

                </div>
            </div>
            {showLiveSupport && (
                <LiveSupportPage
                    onClose={() => setShowLiveSupport(false)}
                />
            )}
        </div>
    );
};

export default CustomerTrackingPage;
