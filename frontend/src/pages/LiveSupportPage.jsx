import React, {
  useState,
  useRef,
  useEffect
} from 'react';

import axios from 'axios';

import Webcam from 'react-webcam';

import '../styles/ai-call.css';

const LiveSupportPage = ({ onClose }) => {
  const [listening, setListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState('');

  const [detections, setDetections] =
    useState([]);

  const recognitionRef = useRef(null);
  const latestTranscriptRef = useRef('');
  const keepListeningRef = useRef(false);
  const processingRef = useRef(false);
  const webcamRef = useRef(null);

  const speakResponse = (
    text
  ) => {

    console.log(
      'SPEAK RESPONSE CALLED'
    );

    console.log(
      'TEXT:',
      text
    );

    if (!text) {

      console.log(
        'NO TEXT PROVIDED'
      );

      return;
    }

    const synth =
      window.speechSynthesis;

    console.log(
      'SYNTH:',
      synth
    );

    synth.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang =
      'en-US';

    utterance.volume =
      1;

    utterance.rate =
      1;

    utterance.pitch =
      1;

    utterance.onstart =
      () => {

        console.log(
          'SPEECH STARTED'
        );
      };

    utterance.onend =
      () => {

        console.log(
          'SPEECH ENDED'
        );
      };

    utterance.onerror =
      e => {

        console.error(
          'SPEECH ERROR:',
          e
        );
      };

    setTimeout(() => {

      console.log(
        'ATTEMPTING SPEAK'
      );

      synth.speak(
        utterance
      );

    }, 1500);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported');
      return;
    }

    if (processingRef.current) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'hi-IN';
    recognition.continuous = true;
    recognition.interimResults = true;

    keepListeningRef.current = true;
    processingRef.current = false;

    latestTranscriptRef.current = '';
    setTranscript('');

    recognition.onstart = () => {
      console.log('VOICE LISTENING STARTED');
      setListening(true);
    };

    recognition.onerror = (event) => {
      console.error('VOICE ERROR:', event);
    };

    recognition.onresult = async (event) => {
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        finalTranscript +=
          event.results[i][0].transcript + ' ';
      }

      finalTranscript = finalTranscript.trim();

      latestTranscriptRef.current = finalTranscript;
      setTranscript(finalTranscript);
    };

    recognition.onend = () => {
      console.log('VOICE LISTENING ENDED');

      if (keepListeningRef.current) {
        try {
          setTimeout(() => {
            recognition.start();
          }, 250);
        } catch (error) {
          console.error('RESTART ERROR:', error);
          setListening(false);
        }
      } else {
        setListening(false);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = async () => {
    keepListeningRef.current = false;

    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('STOP ERROR:', error);
      }
    }

    setListening(false);

    const finalTranscript =
      latestTranscriptRef.current.trim();

    if (!finalTranscript) {
      return;
    }

    if (processingRef.current) {
      return;
    }

    processingRef.current = true;

    try {
      console.log('TRYING TO TRIGGER N8N');

      const response = await axios.post(
        'http://localhost:5678/webhook/aura-live-orchestrator',
        {
          ticketId: 'AURA-' + Date.now(),
          transcript: finalTranscript,
          confidence: 0.91,
          claimAmount: 2500,
          complaintCount: 1,
          customerTier: 'NORMAL',
          riskScore: 20,
          phone: 'whatsapp:+91YOURNUMBER',
          event: 'CLAIM_SUBMITTED'
        }
      );

      console.log(
        'FULL N8N RESPONSE:',
        JSON.stringify(
          response.data,
          null,
          2
        )
      );

      const reply =
        response.data?.reply || response.data?.message || '';

      if (reply) {
        setTimeout(() => {

          speakResponse(

            "Hello. I am Aura, your AI support agent. I have successfully received your complaint and initiated a secure verification workflow. Please stay connected while I analyze the provided information."

          );

        }, 1200);
      }
    } catch (error) {
      console.error('N8N ERROR:', error);
    } finally {
      processingRef.current = false;
    }
  };

  const captureFrame = async () => {
    console.log('CAPTURE RUNNING');

    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((res) => res.blob());

    const formData = new FormData();
    formData.append('frame', blob, 'frame.jpg');

    try {
      const response = await fetch(
        'http://localhost:5000/api/vision/detect',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      console.log('VISION RESPONSE:', data);

      if (data.success) {
        setDetections(data.detections || []);
      }
    } catch (error) {
      console.error('VISION ERROR:', error);
    }
  };

  useEffect(() => {
    console.log('LIVE SUPPORT PAGE LOADED');

    const timer = setTimeout(() => {
      captureFrame();
    }, 2000);

    return () => {
      clearTimeout(timer);

      keepListeningRef.current = false;

      try {
        recognitionRef.current?.stop();
      } catch (error) {
        console.error(error);
      }

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="ai-support-overlay">
      <div className="ai-support-container">
        <div className="ai-header">
          <div>
            <h2>
              Live with <span>Aura.</span>
            </h2>
            <p>
              Voice & vision agent - End-to-end encrypted session
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <button className="ai-session-btn" onClick={onClose}>
              SESSION-LIVE
            </button>

            <button
              className="ai-session-btn"
              onClick={listening ? stopListening : startListening}
            >
              {listening ? 'STOP MIC' : 'START MIC'}
            </button>

            <button
              className="ai-close-btn"
              onClick={onClose}
              aria-label="Close Session"
              title="Close AI Session"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="ai-privacy-banner">
          <div className="ai-check-icon">✓</div>
          <div>
            <strong>Ethically safe & privacy-first.</strong> We don't sell, share, or train models on your data — your conversation stays yours.
            <br />
            <span style={{ opacity: 0.7 }}>
              All audio & video is end-to-end encrypted, processed on-session, and permanently deleted when the call ends. No covert recording, no third-party tracking.
            </span>
          </div>
        </div>

        <div className="ai-grid">
          <div className="ai-col-left">
            <div className="ai-agent-panel">
              <div className="ai-panel-header">
                <span className="ai-pulse-dot"></span> Aura Agent - Live
                <span className="ai-timer">02:14</span>
              </div>

              <div className="ai-orb-container">
                <div className="ai-orb-multicolor"></div>
              </div>

              <p className="ai-transcription">
                {transcript || 'Transcript will appear here...'}
              </p>

              <div className="ai-voice-waves">
                <div className="wave w1"></div>
                <div className="wave w2"></div>
                <div className="wave w3"></div>
                <div className="wave w4"></div>
                <div className="wave w5"></div>
              </div>
            </div>

            <div className="ai-vision-panel">
              <div className="ai-vision-header">
                <span>✦ VISION - YOLOv8 - 32 FPS</span>
              </div>

              <div className="ai-vision-camera">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="live-webcam"
                />

                <div className="ai-camera-controls">
                  <span>You</span>
                  <div className="ai-cam-btn">
                    <div className="cam-icon"></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                    Camera off
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-col-right">
            <div className="ai-detection-panel">
              <div
                className="ai-panel-header"
                style={{ marginBottom: '1rem' }}
              >
                LIVE OBJECT DETECTION
                <span className="ai-scanning-badge">
                  <span className="ai-pulse-dot"></span> SCANNING
                </span>
              </div>

              <div className="ai-threshold">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: 'var(--noir-text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: 800,
                    letterSpacing: '1px'
                  }}
                >
                  <span>CONFIDENCE THRESHOLD</span>
                  <span style={{ color: 'var(--accent-secondary)' }}>0.84</span>
                </div>

                <div className="slider-track">
                  <div className="slider-fill" style={{ width: '84%' }}></div>
                  <div className="slider-thumb" style={{ left: '84%' }}></div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: 'var(--noir-text-muted)',
                    marginTop: '0.5rem'
                  }}
                >
                  <span>0.0</span>
                  <span>0.5</span>
                  <span>1.0</span>
                </div>

                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '0.5rem'
                  }}
                >
                  Highlighting <strong>3</strong> of <strong>4</strong> detections above threshold.
                </p>
              </div>

              <div className="ai-detection-list">
                {detections.map((det, index) => (
                  <div
                    key={index}
                    className="ai-detection-item"
                  >
                    <div
                      className="det-icon"
                      style={{ background: '#FF8A65' }}
                    ></div>

                    <div className="det-info">
                      <strong>{det.label}</strong>
                      <span>YOLOv8 Detection</span>
                    </div>

                    <div className="det-score">
                      {det.confidence}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ai-auto-assessment">
                <strong>Auto-assessment:</strong> Damage detected with high confidence on a fragile-marked package. Aura has pre-filled your claim with the captured frames as evidence.
              </div>
            </div>

            <div className="ai-session-info">
              <div className="ai-session-row">
                <span>SESSION</span>
                <span style={{ color: '#86C19F' }}>
                  <span
                    className="ai-pulse-dot"
                    style={{ background: '#86C19F' }}
                  ></span>{' '}
                  Connected
                </span>
              </div>

              <div className="ai-session-row">
                <span>Agent</span>
                <span>Aura v2.0</span>
              </div>

              <div className="ai-session-row">
                <span>Vision model</span>
                <span>aura-vision-1.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPage;