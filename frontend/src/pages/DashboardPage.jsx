import '../styles/dashboard.css';
import AnalyticsPanel from '../components/AnalyticsPanel';
import VoiceAgent from '../components/VoiceAgent';
import React, { useState, useEffect } from 'react';
import API from '../services/api';

const DashboardPage = ({
  activeView,
  onNavClick,
  onSignOut
}) => {

  const [cases, setCases] =
    useState([]);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const typewriters =
      document.querySelectorAll(
        '.dash-view.active .typewriter-text'
      );

    typewriters.forEach(el => {
      el.classList.remove('active');
      void el.offsetWidth;
      el.classList.add('active');
    });

    const fetchCases = async () => {

      try {

        const response =
          await API.get('/cases');

        if (
          response.data.data &&
          response.data.data.length > 0
        ) {

          setCases(response.data.data);

          setSelectedCase(
            response.data.data[0]
          );
        }

      } catch (error) {

        console.error(
          'Error fetching cases:',
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchCases();

  }, [activeView]);

  const handleApprove = async () => {
    if (!selectedCase) return;
    try {
      const response = await API.put(`/cases/${selectedCase._id}/status`, {
        workflowStatus: 'APPROVED',
        actor: 'SUPPORT_AGENT',
        eventMessage: 'Support Agent approved the claim refund.'
      });
      if (response.data && response.data.data) {
        setSelectedCase(response.data.data);
        // Also update the case in the list
        setCases(prev => prev.map(c => c._id === selectedCase._id ? response.data.data : c));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to approve case.');
    }
  };

  return (
    <div className="dashboard-page">

      <main className="main-content">

        {/* SUPPORT WORKSPACE */}

        {activeView === 'view-support' && (

          <div
            id="view-support"
            className="dash-view dual-col active"
          >

            <div className="col-left">
              <AnalyticsPanel
                cases={cases}
              />
              <VoiceAgent />
              <div
                className="header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >

                <div>

                  <h1 className="typewriter-text active">
                    Resolution Desk
                  </h1>

                  <p>
                    Order {selectedCase?.orderId || '---'}
                  </p>

                </div>

                <div
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: 'rgba(255,255,255,0.8)',
                    color: 'var(--accent-primary)',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}
                >
                  {selectedCase?._id?.slice(-6)}
                </div>

              </div>

              {/* ACTIVE CLAIMS */}

              <div className="claims-queue">

                <h4 className="section-title">
                  Active Claims
                </h4>

                {cases.map((claim) => (

                  <div
                    key={claim._id}

                    className={`claim-card ${selectedCase?._id === claim._id
                      ? 'active-claim'
                      : ''
                      }`}

                    onClick={() =>
                      setSelectedCase(claim)
                    }
                  >

                    <div>

                      <div className="claim-id">
                        {claim.orderId}
                      </div>

                      <div className="claim-user">
                        {claim.customerName}
                      </div>

                    </div>

                    <div className="claim-status">
                      {claim.workflowStatus}
                    </div>

                  </div>

                ))}

              </div>

              {/* METRICS */}

              <div className="metrics-grid">

                <div className="metric-card card-warm">

                  <div className="metric-label">
                    AI Confidence
                  </div>

                  <div className="metric-val">
                    {Math.round(
                      (selectedCase?.confidenceScore || 0) * 100
                    )}%
                  </div>

                  <div
                    className="metric-sub"
                    style={{
                      color:
                        'var(--accent-primary)'
                    }}
                  >
                    Verified Scan
                  </div>

                </div>

                <div className="metric-card card-cool">

                  <div className="metric-label">
                    Risk Score
                  </div>

                  <div className="metric-val">

                    {Math.round(

                      (
                        selectedCase
                          ?.agentResults
                          ?.verification
                          ?.damageConsistencyConfidence || 0
                      ) * 100

                    )}%

                  </div>

                  <div
                    className="metric-sub"
                    style={{
                      color: '#0277BD'
                    }}
                  >
                    {
                      selectedCase
                        ?.agentResults
                        ?.verification
                        ?.verificationStatus
                    }
                  </div>

                </div>

                <div className="metric-card card-mint">

                  <div className="metric-label">
                    SLA Time
                  </div>

                  <div className="metric-val">
                    {
                      selectedCase?.escalationRequired
                        ? '2h'
                        : '25m'
                    }
                  </div>

                  <div
                    className="metric-sub"
                    style={{
                      color: '#2E7D32'
                    }}
                  >
                    {
                      selectedCase?.workflowStatus
                    }
                  </div>

                </div>

              </div>

              {/* LIVE JOURNEY */}

              <div>

                <h4 className="section-title">
                  Live Journey
                </h4>

                {
                  selectedCase?.eventStream?.map(
                    (event, index) => (

                      <div
                        key={index}
                        className="timeline-item"
                      >

                        <div
                          className={`dot ${index === 0
                            ? 'active'
                            : ''
                            }`}
                        ></div>

                        <div>

                          <div className="timeline-meta">

                            {
                              new Date(
                                event.eventTimestamp
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }

                          </div>

                          <div className="timeline-title">
                            {event.eventMessage}
                          </div>

                          <div
                            style={{
                              fontSize: '0.75rem',
                              opacity: 0.6,
                              marginTop: '0.2rem',
                              textTransform: 'uppercase'
                            }}
                          >
                            {event.actor}
                          </div>

                        </div>

                      </div>

                    ))
                }

              </div>

              {/* RESOLUTION */}

              <div className="glass-panel">

                <div>

                  <h4
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800
                    }}
                  >
                    {
                      selectedCase
                        ?.agentResults
                        ?.recommendation
                        ?.decision
                    }
                  </h4>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.3rem'
                    }}
                  >
                    {
                      selectedCase
                        ?.agentResults
                        ?.recommendation
                        ?.reasoning
                    }
                  </p>

                </div>

                <button
                  onClick={handleApprove}
                  style={{
                    background:
                      'var(--dark-slate)',
                    color: '#fff',
                    border: 'none',
                    padding:
                      '0.85rem 1.75rem',
                    borderRadius: '100px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Approve
                </button>

              </div>

            </div>

            {/* RIGHT PANEL */}

            <div className='col-right'>
              <div className="rhs-stack">

                {/* STATUS */}

                <div className="status-pill">
                  {selectedCase?.workflowStatus}
                </div>

                {/* PROFILE */}

                <div className="rhs-card">

                  <div className="meta-title">
                    AURA MEMBER
                  </div>

                  <div className="profile-name">
                    {selectedCase?.customerName}
                  </div>

                  <div className="profile-sub">
                    INDIA • VERIFIED
                  </div>

                </div>

                {/* TRUST */}

                <div className="rhs-card">

                  <div className="trust-row">

                    <span>TRUST SCORE</span>

                    <span>
                      {Math.round(
                        (selectedCase?.confidenceScore || 0) * 100
                      )}%
                    </span>

                  </div>

                  <div className="trust-track">

                    <div
                      className="trust-fill"
                      style={{
                        width: `${Math.round(
                          (selectedCase?.confidenceScore || 0) * 100
                        )
                          }%`
                      }}
                    ></div>

                  </div>

                </div>

                {/* POLICY */}

                <div className="rhs-card">

                  <div className="meta-title">
                    POLICY MATCHING
                  </div>

                  <div className="policy-main">
                    {selectedCase?.claimedDamage}
                  </div>

                  <div className="policy-sub">
                    Standard Coverage
                  </div>

                  <div className="policy-status">
                    COVERED
                  </div>

                </div>

                {/* AI ANALYSIS */}

                <div className="rhs-card">

                  <div className="meta-title">
                    AI ANALYSIS
                  </div>

                  <div className="analysis-grid">

                    <div className="analysis-item">

                      <span>
                        Product Match
                      </span>

                      <strong>
                        {Math.round(
                          (
                            selectedCase
                              ?.agentResults
                              ?.verification
                              ?.productMatchConfidence || 0
                          ) * 100
                        )}%
                      </strong>

                    </div>

                    <div className="analysis-item">

                      <span>
                        Damage Match
                      </span>

                      <strong>
                        {Math.round(
                          (
                            selectedCase
                              ?.agentResults
                              ?.verification
                              ?.damageConsistencyConfidence || 0
                          ) * 100
                        )}%
                      </strong>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* CUSTOMER VIEW */}
        {activeView === 'view-customer' && (
          <div id="view-customer" className="dash-view dual-col active">

            <div className="col-left">
              <div className="header">
                <h1 className="typewriter-text active">Hi {selectedCase?.customerName?.split(' ')[0] || 'Customer'}.</h1>
                <p>We are reviewing your claim for Order {selectedCase?.orderId || '---'}.</p>
              </div>

              <div className="glass-panel" style={{ flexDirection: 'column', textAlign: 'center', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '2rem', filter: 'drop-shadow(0 15px 20px rgba(15,23,42,0.1))' }}>📦</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                  {selectedCase?.workflowStatus === 'RESOLVED' || selectedCase?.workflowStatus === 'APPROVED' ? 'Claim Approved.' : 'Everything is on track.'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
                  Our dedicated team is verifying the details. You can track live updates below.
                </p>
              </div>

              {/* LIVE JOURNEY */}
              <div style={{ marginTop: '3rem' }}>
                <h4 className="section-title">Live Journey</h4>
                {selectedCase?.eventStream?.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className={`dot ${index === 0 ? 'active' : ''}`}></div>
                    <div>
                      <div className="timeline-meta">
                        {new Date(event.eventTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today
                      </div>
                      <div className="timeline-title">{event.eventMessage}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.2rem', textTransform: 'uppercase' }}>
                        {event.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-right" style={{ background: 'linear-gradient(135deg, rgba(230,81,0,0.9), rgba(62,39,35,0.95))', borderColor: 'rgba(255,255,255,0.15)' }}>
              <div className="meta-title" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>REFUND STATUS</div>
              <div style={{ position: 'relative', zIndex: 2, fontSize: '5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1.5rem', textShadow: '0 15px 30px rgba(0,0,0,0.3)', letterSpacing: '-3px', color: '#fff' }}>
                {selectedCase?.workflowStatus === 'APPROVED' ? 'Approved' : 'Pending'}
              </div>
              <p style={{ position: 'relative', zIndex: 2, fontSize: '1.1rem', fontWeight: 600, opacity: 0.9, lineHeight: 1.5 }}>
                Estimated refund amount processing to your original payment method upon final approval.
              </p>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default DashboardPage;