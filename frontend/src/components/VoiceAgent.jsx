import React, {
    useState,
    useRef
} from "react";

import axios from "axios";

const VoiceAgent = () => {
    console.log(
        "VOICE AGENT COMPONENT LOADED"
    );
    const [listening, setListening] =
        useState(false);

    const [transcript, setTranscript] =
        useState("");

    const [agentReply, setAgentReply] =
        useState("");

    const recognitionRef =
        useRef(null);

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert(
                "Speech Recognition not supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.lang = "hi-IN";

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.onstart = () => {

            console.log(
                "VOICE RECOGNITION STARTED"
            );

            setListening(true);
        };

        recognition.onerror = (event) => {

            console.error(
                "VOICE ERROR:",
                event
            );
        };

        recognition.onend = () => {

            console.log(
                "VOICE RECOGNITION ENDED"
            );

            setListening(false);
        };

        recognition.onresult = async (event) => {

            try {

                let finalTranscript = "";

                for (
                    let i = 0;
                    i < event.results.length;
                    i++
                ) {

                    finalTranscript +=
                        event.results[i][0]
                            .transcript + " ";
                }

                finalTranscript =
                    finalTranscript.trim();

                console.log(
                    "USER SAID:",
                    finalTranscript
                );

                setTranscript(
                    finalTranscript
                );

                console.log(
                    "TRIGGERING N8N..."
                );

                const response =
                    await axios.post(

                        "http://localhost:5678/webhook-test/aura-live-orchestrator",

                        {

                            ticketId:
                                "AURA-" + Date.now(),

                            transcript:
                                finalTranscript,

                            confidence: 0.91,

                            claimAmount: 2500,

                            complaintCount: 1,

                            customerTier:
                                "NORMAL",

                            riskScore: 20,

                            phone:
                                "whatsapp:+91YOURNUMBER",

                            event:
                                "CLAIM_SUBMITTED"
                        }
                    );

                console.log(
                    "AI ORCHESTRATION RESPONSE:",
                    response.data
                );

                const aiMessage =
                    "Your claim has been initiated and sent for AI verification.";

                setAgentReply(
                    aiMessage
                );

                const utterance =
                    new SpeechSynthesisUtterance(
                        aiMessage
                    );

                utterance.lang =
                    "en-US";

                speechSynthesis.speak(
                    utterance
                );

            } catch (error) {

                console.error(
                    "N8N ERROR:",
                    error
                );

                const errorMessage =
                    "Sorry. Something went wrong while processing your request.";

                setAgentReply(
                    errorMessage
                );

                const utterance =
                    new SpeechSynthesisUtterance(
                        errorMessage
                    );

                speechSynthesis.speak(
                    utterance
                );
            }
        };

        recognition.start();

        recognitionRef.current =
            recognition;
    };

    const stopListening = () => {

        recognitionRef.current?.stop();

        setListening(false);
    };

    return (

        <div className="voice-agent-card">

            <div className="voice-header">

                <h2>
                    Aura Voice Agent
                </h2>

                <p>
                    Multilingual AI Claim Assistant
                </p>

            </div>

            <div className="voice-wave">

                {
                    listening
                        ? "🎙️ Listening..."
                        : "🤖 Voice Agent Idle"
                }

            </div>

            <div className="transcript-box">

                <strong>
                    User Transcript:
                </strong>

                <br />

                {
                    transcript ||
                    "Transcript will appear here..."
                }

            </div>

            <div className="transcript-box">

                <strong>
                    AI Agent Reply:
                </strong>

                <br />

                {
                    agentReply ||
                    "AI response will appear here..."
                }

            </div>

            <div className="voice-actions">

                <button
                    onClick={startListening}
                >
                    Start Listening
                </button>

                <button
                    onClick={stopListening}
                >
                    Stop Listening
                </button>

            </div>

        </div>
    );
};

export default VoiceAgent;