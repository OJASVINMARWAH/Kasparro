
import '../styles/dashboard.css';
import AnalyticsPanel from '../components/AnalyticsPanel';
import VoiceAgent from '../components/VoiceAgent';
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import API from '../services/api';

const DashboardPage = ({
  activeView
}) => {

  const [cases, setCases] =
    useState([]);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [approving, setApproving] =
    useState(false);

  // =============================
  // FETCH CASES
  // =============================

  const fetchCases =
    useCallback(async () => {

      try {

        const response =
          await API.get('/api/cases');

        const fetchedCases =
          response?.data?.data || [];

        setCases(fetchedCases);

        if (
          fetchedCases.length > 0
        ) {

          setSelectedCase(prev => {

            if (!prev)
              return fetchedCases[0];

            const updatedSelected =
              fetchedCases.find(
                c =>
                  c.orderId === prev.orderId
              );

            return (
              updatedSelected ||
              fetchedCases[0]
            );
          });
        }

      } catch (error) {

        console.error(
          'FETCH CASES ERROR:',
          error
        );

      } finally {

        setLoading(false);
      }

    }, []);

  // =============================
  // INITIAL LOAD
  // =============================

  useEffect(() => {

    fetchCases();

  }, [fetchCases]);

  // =============================
  // TYPEWRITER EFFECT
  // =============================

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

  }, [activeView]);

  // =============================
  // APPROVE CLAIM
  // =============================

  const handleApprove =
    async () => {

      if (!selectedCase) {

        alert(
          'No case selected.'
        );

        return;
      }

      try {

        setApproving(true);

        console.log(
          'APPROVING CASE:',
          selectedCase
        );

        const response =
          await API.put(

            `/api/cases/${selectedCase.orderId}/status`,

            {
              workflowStatus:
                'APPROVED',

              actor:
                'SUPPORT_AGENT',

              eventMessage:
                'Support Agent approved the refund claim.'
            }
          );

        console.log(
          'FULL APPROVE RESPONSE:',
          response.data
        );

        const updatedCase =

          response?.data?.updatedCase ||

          response?.data?.data ||

          response?.data?.case ||

          response?.data;

        if (!updatedCase) {

          throw new Error(
            'Updated case not received from backend.'
          );
        }

        // UPDATE SELECTED CASE

        setSelectedCase(updatedCase);

        // UPDATE CASE LIST

        setCases(prevCases =>

          prevCases.map(c =>

            c.orderId ===
              updatedCase.orderId

              ? updatedCase

              : c
          )
        );

        alert(
          'Case approved successfully.'
        );

      } catch (error) {

        console.error(
          'APPROVE ERROR:',
          error
        );

        console.error(
          'BACKEND RESPONSE:',
          error?.response?.data
        );

        alert(
          error?.response?.data?.message ||
          error.message ||
          'Failed to approve case.'
        );

      } finally {

        setApproving(false);
      }
    };

  // =============================
  // LOADING UI
  // =============================

  if (loading) {

    return (
      <div
        className="dashboard-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontWeight: 700,
          fontSize: '1.2rem'
        }}
      >
        Loading Aura Dashboard...
      </div>
    );
  }

  return (

    <div className="dashboard-page">

      <main className="main-content">

        {/* SUPPORT VIEW */}

        {activeView === 'view-support' && (

          <div
            id="view-support"
            className="dash-view dual-col active"
          >

            {/* LEFT PANEL */}

            <div className="col-left">

              <AnalyticsPanel
                cases={cases}
              />

              <VoiceAgent />

              {/* HEADER */}

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
                    Order {
                      selectedCase?.orderId || '---'
                    }
                  </p>

                </div>

                <div
                  style={{
                    padding: '0.5rem 1.25rem',
                    background:
                      'rgba(255,255,255,0.8)',
                    color:
                      'var(--accent-primary)',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}
                >
                  {
                    selectedCase?.orderId?.slice(-6)
                  }
                </div>

              </div>

              {/* ACTIVE CLAIMS */}

              <div className="claims-queue">

                <h4 className="section-title">
                  Active Claims
                </h4>

                {cases.map(claim => (

                  <div
                    key={claim.orderId}

                    className={`claim-card ${selectedCase?.orderId ===
                      claim.orderId

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
                      (
                        selectedCase?.confidenceScore || 0
                      ) * 100
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
                  selectedCase?.eventStream
                    ?.length > 0

                    ? (

                      selectedCase.eventStream.map(
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
                        )
                      )

                    )

                    : (

                      <div
                        style={{
                          opacity: 0.6,
                          marginTop: '1rem'
                        }}
                      >
                        No journey events available.
                      </div>
                    )
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

                  disabled={approving}

                  style={{
                    background:
                      approving
                        ? '#666'
                        : 'var(--dark-slate)',

                    color: '#fff',
                    border: 'none',
                    padding:
                      '0.85rem 1.75rem',
                    borderRadius: '100px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    opacity:
                      approving ? 0.7 : 1
                  }}
                >
                  {
                    approving
                      ? 'Approving...'
                      : 'Approve'
                  }
                </button>

              </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="col-right">

              <div className="rhs-stack">

                <div className="status-pill">
                  {selectedCase?.workflowStatus}
                </div>

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

                <div className="rhs-card">

                  <div className="trust-row">

                    <span>TRUST SCORE</span>

                    <span>
                      {Math.round(
                        (
                          selectedCase?.confidenceScore || 0
                        ) * 100
                      )}%
                    </span>

                  </div>

                  <div className="trust-track">

                    <div
                      className="trust-fill"
                      style={{
                        width: `${Math.round(
                          (
                            selectedCase?.confidenceScore || 0
                          ) * 100
                        )}%`
                      }}
                    ></div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default DashboardPage;

