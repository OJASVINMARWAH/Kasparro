import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/intake.css';

const ComplaintIntakePage = ({ onComplaintSuccess }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        orderId: '',
        productId: '',
        claimedDamage: '',
        issue: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [evidenceFiles, setEvidenceFiles] = useState([]);

    useEffect(() => {
        // Trigger typewriter animation on mount
        const typewriters = document.querySelectorAll('.intake-page.active .typewriter-text');
        typewriters.forEach((el) => {
            el.classList.remove('active');
            void el.offsetWidth;
            el.classList.add('active');
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setEvidenceFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEvidenceFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataObj = new FormData();

            // Append form data
            Object.keys(formData).forEach(key => {
                formDataObj.append(key, formData[key]);
            });

            // Append files
            evidenceFiles.forEach(file => {
                formDataObj.append('evidenceFiles', file);
            });

            // If using axios via api.js, ensure headers for multipart are handled properly
            // Usually axios sets this automatically when data is FormData
            const response = await API.post('/api/cases', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Navigate to tracking portal with the new case data
            if (onComplaintSuccess && response.data && response.data.data) {
                onComplaintSuccess(response.data.data);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error submitting claim:", error);
            alert("Failed to submit claim. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="intake-page-wrapper">
            <div className="grid-layer"></div>
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>

            <div className="curator-footer">
                Curated By Hurreet Kaur and Ojasvin Marwah, TIET Patiala
            </div>

            <div id="complaint-page" className="intake-page active">
                <div className="complaint-container">

                    <div className="complaint-text">
                        <div className="elegant-badge">Aura Resolution Center</div>
                        <h1 className="typewriter-text active">Register a<br />Claim.</h1>
                        <p>Experiencing an issue? Submit your details below. Our predictive AI engine and dedicated agents will process your request instantly.</p>

                        <div style={{ opacity: 0, animation: 'fadeUp 0.8s forwards', animationDelay: '1.5s', display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E65100' }}>24h</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#8D6E63', letterSpacing: '1px' }}>SLA Guarantee</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E65100' }}>98%</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#8D6E63', letterSpacing: '1px' }}>Approval Rate</div>
                            </div>
                        </div>
                    </div>

                    <div className="form-card">
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', color: '#3E2723' }}>Claim Details</h2>
                        <p style={{ color: '#8D6E63', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2.5rem' }}>Please provide accurate information to expedite processing.</p>

                        <form onSubmit={handleSubmit}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="intake-input-group">
                                    <label>FULL NAME</label>
                                    <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="e.g. Bruce Wayne" required />
                                </div>
                                <div className="intake-input-group">
                                    <label>EMAIL</label>
                                    <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} placeholder="e.g. bruce@test.com" required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="intake-input-group">
                                    <label>ORDER ID</label>
                                    <input type="text" name="orderId" value={formData.orderId} onChange={handleChange} placeholder="e.g. BAT1001" required />
                                </div>
                                <div className="intake-input-group">
                                    <label>PRODUCT ID</label>
                                    <input type="text" name="productId" value={formData.productId} onChange={handleChange} placeholder="e.g. BATMOBILE-X" required />
                                </div>
                            </div>

                            <div className="intake-input-group">
                                <label>CLAIMED DAMAGE</label>
                                <input type="text" name="claimedDamage" value={formData.claimedDamage} onChange={handleChange} placeholder="e.g. Front armor cracked" required />
                            </div>

                            <div className="intake-input-group">
                                <label>ISSUE DESCRIPTION</label>
                                <textarea name="issue" value={formData.issue} onChange={handleChange} placeholder="Please describe the issue with your order in detail..." required></textarea>
                            </div>

                            <div className="intake-input-group">
                                <label>EVIDENCE UPLOAD</label>
                                <label
                                    className={`upload-zone ${dragActive ? 'dragover' : ''}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    style={{ display: 'block', margin: '0' }}
                                >
                                    <input type="file" multiple accept="image/jpeg, image/png, video/mp4" style={{ display: 'none' }} onChange={handleFileChange} />
                                    <div className="upload-icon">📸</div>
                                    <div className="upload-text">
                                        {evidenceFiles.length > 0 ? `${evidenceFiles.length} file(s) selected` : 'Click to upload or drag & drop'}
                                    </div>
                                    <div className="upload-sub">PNG, JPG, or MP4 (Max 20MB)</div>
                                </label>
                            </div>

                            <button type="submit" className="intake-btn-creative" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Submit Registration'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 10 }}>
                                <Link to="/dashboard" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8D6E63', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', transition: 'all 0.4s ease', display: 'inline-block', padding: '0.5rem' }} onMouseOver={(e) => e.target.style.color = '#3E2723'} onMouseOut={(e) => e.target.style.color = '#8D6E63'}>
                                    Return to Dashboard
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ComplaintIntakePage;
