import React, { useState, useEffect } from 'react';
import PaymentPage from './PaymentPage';

// ============================================================================
// COMPLETE DOCUMENT UPLOAD PAGE - SINGLE FILE VERSION
// ============================================================================

const DocumentUploadPage = () => {
  // State Management
  const [userId] = useState(() => {
    const stored = localStorage.getItem('gpseva_userId');
    if (stored) return stored;
    const newId = `user_${Date.now()}`;
    localStorage.setItem('gpseva_userId', newId);
    return newId;
  });

  const [uploadedDocuments, setUploadedDocuments] = useState({
    document1: null,
    document2: null,
    document3: null
  });

  const [uploadProgress, setUploadProgress] = useState({
    document1: 0,
    document2: 0,
    document3: 0
  });

  const [uploadStatus, setUploadStatus] = useState({
    document1: 'pending',
    document2: 'pending',
    document3: 'pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  // Document Configuration
  const documents = [
    {
      id: 'document1',
      title: 'ग्रामपंचायत नोंदणी फॉर्म',
      titleEn: 'Gram Panchayat Registration Form',
      description: 'ग्रामपंचायतीची संपूर्ण माहिती भरण्यासाठी फॉर्म',
      icon: '📋',
      fileName: 'GP_Registration_Form.pdf',
      color: 'orange'
    },
    {
      id: 'document2',
      title: 'अधिकृतता प्रमाणपत्र',
      titleEn: 'Authorization Certificate',
      description: 'अधिकृत व्यक्ती प्रमाणपत्र आणि सहमती फॉर्म',
      icon: '✅',
      fileName: 'Authorization_Certificate.pdf',
      color: 'green'
    },
    {
      id: 'document3',
      title: 'बँक तपशील फॉर्म',
      titleEn: 'Bank Details Form',
      description: 'ग्रामपंचायतीचे बँक खाते तपशील फॉर्म',
      icon: '🏦',
      fileName: 'Bank_Details_Form.pdf',
      color: 'blue'
    }
  ];

  // Load saved documents from localStorage on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem(`gpseva_docs_${userId}`);
    if (savedDocs) {
      try {
        const parsed = JSON.parse(savedDocs);
        setUploadedDocuments(parsed.documents || {});
        setUploadStatus(parsed.status || {});
      } catch (error) {
        console.error('Error loading saved documents:', error);
      }
    }
  }, [userId]);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    const dataToSave = {
      documents: uploadedDocuments,
      status: uploadStatus
    };
    localStorage.setItem(`gpseva_docs_${userId}`, JSON.stringify(dataToSave));
  }, [uploadedDocuments, uploadStatus, userId]);

  
    

const handleDownload = async (doc) => {
  const codeMap = {
    document1: 'GP_FORM',
    document2: 'AUTH_CERT',
    document3: 'BANK_FORM'
  };

  const code = codeMap[doc.id];

  try {
    const response = await fetch(
      `http://localhost:8080/api/documents/download/${code}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob(); // ✅ blob IS DEFINED HERE
    const url = window.URL.createObjectURL(blob);

    const link = window.document.createElement('a');
    link.href = url;
    link.download = doc.fileName;
    window.document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert('डाऊनलोड करताना त्रुटी आली!');
    console.error(error);
  }
};

  // Handle file upload with base64 conversion for localStorage
// Handle file upload → send to backend (DB)
const handleFileUpload = async (event, documentId) => {
  const file = event.target.files[0];
  if (!file) return;

  // ✅ File type validation
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf'
  ];
  if (!validTypes.includes(file.type)) {
    alert('कृपया फक्त JPG, PNG, WEBP किंवा PDF फाइल अपलोड करा!');
    return;
  }

  // ✅ Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    alert('फाइल साइज 5MB पेक्षा कमी असावी!');
    return;
  }

  // ✅ UI status
  setUploadStatus(prev => ({ ...prev, [documentId]: 'uploading' }));
  setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));

  try {
    // ✅ Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentId); // GP_FORM, BANK_FORM
    formData.append("userId", 1); // replace with logged-in user id

    // ✅ Use XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(prev => ({ ...prev, [documentId]: percent }));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        // ✅ Save metadata only (NO BASE64)
        setUploadedDocuments(prev => ({
          ...prev,
          [documentId]: {
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString()
          }
        }));

        setUploadStatus(prev => ({ ...prev, [documentId]: 'completed' }));
        setUploadProgress(prev => ({ ...prev, [documentId]: 100 }));
        alert('फाइल यशस्वीरित्या अपलोड झाली!');
      } else {
        throw new Error("Upload failed");
      }
    };

    xhr.onerror = () => {
      throw new Error("Upload error");
    };

    xhr.open("POST", "http://localhost:8080/api/documents/upload");
    xhr.send(formData);

  } catch (error) {
    console.error(error);
    setUploadStatus(prev => ({ ...prev, [documentId]: 'pending' }));
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    alert('फाइल अपलोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
  }
};

  // Handle file removal
  const handleRemoveFile = (documentId) => {
    const confirmDelete = window.confirm('तुम्हाला हा दस्तऐवज हटवायचा आहे का?');
    
    if (!confirmDelete) return;

    setUploadedDocuments(prev => ({ ...prev, [documentId]: null }));
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    setUploadStatus(prev => ({ ...prev, [documentId]: 'pending' }));
    
    alert('दस्तऐवज यशस्वीरित्या हटवला!');
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Check if all documents are uploaded
  const allDocumentsUploaded = Object.values(uploadedDocuments).every(doc => doc !== null);

  // Handle final submission
  const handleSubmit = async () => {
    if (!allDocumentsUploaded) {
      alert('कृपया सर्व दस्तऐवज अपलोड करा!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for database submission
      const submissionData = {
        userId: userId,
        documents: {
          document1: {
            name: uploadedDocuments.document1.name,
            size: uploadedDocuments.document1.size,
            type: uploadedDocuments.document1.type,
            data: uploadedDocuments.document1.data, // base64 data
            uploadDate: uploadedDocuments.document1.uploadDate
          },
          document2: {
            name: uploadedDocuments.document2.name,
            size: uploadedDocuments.document2.size,
            type: uploadedDocuments.document2.type,
            data: uploadedDocuments.document2.data,
            uploadDate: uploadedDocuments.document2.uploadDate
          },
          document3: {
            name: uploadedDocuments.document3.name,
            size: uploadedDocuments.document3.size,
            type: uploadedDocuments.document3.type,
            data: uploadedDocuments.document3.data,
            uploadDate: uploadedDocuments.document3.uploadDate
          }
        },
        submittedAt: new Date().toISOString(),
        status: 'pending_payment'
      };

      // ============================================================
      // OPTION 1: Using Fetch API to save to backend
      // ============================================================
      /*
      const response = await fetch('http://localhost:5000/api/submit-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit documents');
      }

      const result = await response.json();
      const submissionId = result.submissionId;
      */

      // ============================================================
      // OPTION 2: Using Axios to save to backend (if you have axios installed)
      // ============================================================
      /*
      import axios from 'axios';
      
      const response = await axios.post('http://localhost:5000/api/submit-documents', submissionData);
      const submissionId = response.data.submissionId;
      */

      // ============================================================
      // TEMPORARY: Save to localStorage (for demo without backend)
      // ============================================================
      const tempSubmissionId = `SUB_${Date.now()}`;
      localStorage.setItem(`gpseva_submission_${userId}`, JSON.stringify({
        ...submissionData,
        submissionId: tempSubmissionId
      }));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Set submission state
      setSubmissionId(tempSubmissionId);
      setIsSubmitted(true);
      
      alert('सर्व दस्तऐवज यशस्वीरित्या सबमिट झाले!');
      
      console.log('Submission data:', submissionData);
      console.log('Submission ID:', tempSubmissionId);

    } catch (error) {
      console.error('Submission error:', error);
      alert('दस्तऐवज सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle navigation to payment page
  const handleProceedToPayment = () => {
    // Save submission ID for payment page
    localStorage.setItem('gpseva_current_submission', submissionId);
    
    // ============================================================
    // OPTION 1: Using React Router (if you have react-router-dom)
    // ============================================================
    /*
    import { useNavigate } from 'react-router-dom';
    const navigate = useNavigate();
    navigate('/payment', { state: { submissionId: submissionId } });
    */

    // ============================================================
    // OPTION 2: Using window.location (direct navigation)
    // ============================================================
    window.location.href = `/payment?submission=${submissionId}`;

    // ============================================================
    // OPTION 3: Using Next.js router (if using Next.js)
    // ============================================================
    /*
    import { useRouter } from 'next/router';
    const router = useRouter();
    router.push({
      pathname: '/payment',
      query: { submission: submissionId }
    });
    */
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>GP</div>
            <div style={styles.logoText}>
              <h1 style={styles.logoTitle}>GPSEVA</h1>
              <p style={styles.logoSubtitle}>डिजिटल ग्रामपंचायत सेवा</p>
            </div>
          </div>
          <button style={styles.btnBack} onClick={() => window.history.back()}>
            ← मागे जा
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div style={styles.badge}>दस्तऐवज अपलोड</div>
          <h2 style={styles.pageTitle}>
            आवश्यक <span style={styles.highlight}>दस्तऐवज</span> अपलोड करा
          </h2>
          <p style={styles.subtitle}>खालील तीन दस्तऐवज डाउनलोड करा, भरा आणि अपलोड करा</p>
        </div>

        {/* Instructions */}
        <div style={styles.instructionsCard}>
          <div style={styles.instructionIcon}>💡</div>
          <div style={styles.instructionContent}>
            <h3 style={styles.instructionTitle}>सूचना:</h3>
            <ol style={styles.instructionList}>
              <li>खाली दिलेले तीन फॉर्म डाउनलोड करा. प्रत्येक फॉर्म मॅन्युअली भरा किंवा प्रिंट काढून भरा. भरलेल्या फॉर्मचे स्पष्ट फोटो काढा किंवा स्कॅन करा. प्रत्येक दस्तऐवज योग्य ठिकाणी अपलोड करा. सर्व दस्तऐवज अपलोड झाल्यानंतर "सबमिट करा" बटण दाबा</li>
            </ol>
          </div>
        </div>

        {/* Progress Indicator */}
        <div style={styles.progressIndicator}>
          <div style={styles.progressSteps}>
            {documents.map((doc, index) => (
              <div 
                key={doc.id} 
                style={{
                  ...styles.progressStep,
                  ...(uploadStatus[doc.id] === 'completed' && styles.progressStepCompleted),
                  ...(uploadStatus[doc.id] === 'uploading' && styles.progressStepActive)
                }}
              >
                <div style={{
                  ...styles.stepCircle,
                  ...(uploadStatus[doc.id] === 'completed' && styles.stepCircleCompleted),
                  ...(uploadStatus[doc.id] === 'uploading' && styles.stepCircleActive)
                }}>
                  {uploadStatus[doc.id] === 'completed' ? '✓' : index + 1}
                </div>
                <span style={styles.stepLabel}>{doc.titleEn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Cards */}
        <div style={styles.documentsGrid}>
          {documents.map((doc) => (
            <div key={doc.id} style={{...styles.documentCard, ...styles[`card${doc.color.charAt(0).toUpperCase() + doc.color.slice(1)}`]}}>
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={{...styles.docIcon, ...styles[`icon${doc.color.charAt(0).toUpperCase() + doc.color.slice(1)}`]}}>
                  {doc.icon}
                </div>
                <div style={styles.docInfo}>
                  <h3 style={styles.docTitle}>{doc.title}</h3>
                  <p style={styles.docTitleEn}>{doc.titleEn}</p>
                  <p style={styles.docDescription}>{doc.description}</p>
                </div>
              </div>

              {/* Download Button */}
              <button 
                style={styles.btnDownload}
                onClick={() => handleDownload(doc)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                फॉर्म डाउनलोड करा
              </button>

              {/* Upload Section */}
              <div style={styles.uploadSection}>
                {!uploadedDocuments[doc.id] ? (
                  <>
                    <label style={styles.uploadArea} htmlFor={`upload-${doc.id}`}>
                      <input
                        type="file"
                        id={`upload-${doc.id}`}
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileUpload(e, doc.id)}
                        style={{ display: 'none' }}
                      />
                      <div style={styles.uploadIcon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <h4 style={styles.uploadTitle}>भरलेला फॉर्म अपलोड करा</h4>
                      <p style={styles.uploadText}>क्लिक करा किंवा फाइल येथे ड्रॅग करा</p>
                      <span style={styles.fileInfo}>JPG, PNG, WEBP किंवा PDF (max 5MB)</span>
                    </label>

                    {uploadStatus[doc.id] === 'uploading' && (
                      <div style={styles.progressBarContainer}>
                        <div style={styles.progressBar}>
                          <div 
                            style={{
                              ...styles.progressFill,
                              width: `${uploadProgress[doc.id]}%`
                            }}
                          />
                        </div>
                        <span style={styles.progressText}>{uploadProgress[doc.id]}%</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={styles.uploadedFile}>
                    <div style={styles.fileIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                      </svg>
                    </div>
                    <div style={styles.fileDetails}>
                      <h4 style={styles.fileName}>{uploadedDocuments[doc.id].name}</h4>
                      <p style={styles.fileSize}>{formatFileSize(uploadedDocuments[doc.id].size)}</p>
                      <span style={styles.uploadDate}>
                        अपलोड केले: {new Date(uploadedDocuments[doc.id].uploadDate).toLocaleString('mr-IN')}
                      </span>
                    </div>
                    <div style={styles.fileActions}>
                      <button style={styles.btnIconSuccess}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </button>
                      <button 
                        style={styles.btnIconDanger}
                        onClick={() => handleRemoveFile(doc.id)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div style={styles.submitSection}>
          {!isSubmitted ? (
            <>
              {allDocumentsUploaded ? (
                <div style={styles.successMessage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>सर्व दस्तऐवज यशस्वीरित्या अपलोड झाले!</span>
                </div>
              ) : (
                <div style={styles.warningMessage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>कृपया सर्व दस्तऐवज अपलोड करा</span>
                </div>
              )}

              <button 
                style={{
                  ...styles.btnSubmit,
                  ...(allDocumentsUploaded ? styles.btnSubmitActive : styles.btnSubmitDisabled)
                }}
                onClick={handleSubmit}
                disabled={!allDocumentsUploaded || isSubmitting}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {isSubmitting ? 'सबमिट होत आहे...' : 'सबमिट करा'}
              </button>
            </>
          ) : (
            <>
              {/* Success message after submission */}
              <div style={styles.submittedCard}>
                <div style={styles.submittedIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 style={styles.submittedTitle}>दस्तऐवज यशस्वीरित्या सबमिट झाले!</h3>
                <p style={styles.submittedText}>
                  तुमचे सर्व दस्तऐवज सेव्ह झाले आहेत. आता पेमेंट करण्यासाठी पुढे जा.
                </p>
                <div style={styles.submissionInfo}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Submission ID:</span>
                    <span style={styles.infoValue}>{submissionId}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Status:</span>
                    <span style={styles.infoStatus}>✓ Documents Saved</span>
                  </div>
                </div>
                
                {/* Next Button to go to Payment Page */}
                <button 
                  style={styles.btnNext}
                  onClick={handleProceedToPayment}
                >
                  पेमेंट पेजवर जा
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>

                {/* Optional: Edit documents button */}
                <button 
                  style={styles.btnEdit}
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmissionId(null);
                  }}
                >
                  दस्तऐवज संपादित करा
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INLINE STYLES
// ============================================================================

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FFF8F0',
    fontFamily: "'Hind', 'Poppins', sans-serif"
  },
  header: {
    background: 'white',
    padding: '20px 0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logo: {
    width: '60px',
    height: '60px',
    background: '#FF6B35',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: '800',
    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
  },
  logoText: {
    lineHeight: '1.2'
  },
  logoTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1A1A1A',
    margin: 0,
    letterSpacing: '-0.5px'
  },
  logoSubtitle: {
    fontSize: '13px',
    color: '#666',
    margin: 0
  },
  btnBack: {
    padding: '12px 28px',
    background: 'white',
    color: '#FF6B35',
    border: '2px solid #FF6B35',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px 40px 80px'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  badge: {
    display: 'inline-block',
    padding: '10px 24px',
    background: 'rgba(255, 140, 66, 0.15)',
    color: '#FF6B35',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '20px'
  },
  pageTitle: {
    fontSize: '52px',
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: '15px',
    lineHeight: '1.2'
  },
  highlight: {
    color: '#FF6B35'
  },
  subtitle: {
    fontSize: '18px',
    color: '#666'
  },
  instructionsCard: {
    background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.1), rgba(168, 230, 176, 0.1))',
    padding: '40px',
    borderRadius: '20px',
    display: 'flex',
    gap: '30px',
    marginBottom: '50px',
    border: '2px solid rgba(66, 153, 225, 0.2)'
  },
  instructionIcon: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    flexShrink: 0,
    boxShadow: '0 8px 25px rgba(66, 153, 225, 0.3)'
  },
  instructionContent: {
    flex: 1
  },
  instructionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '15px'
  },
  instructionList: {
    fontSize: '16px',
    color: '#1A1A1A',
    lineHeight: '2',
    paddingLeft: '20px'
  },
  progressIndicator: {
    marginBottom: '50px'
  },
  progressSteps: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative'
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    zIndex: 1
  },
  stepCircle: {
    width: '50px',
    height: '50px',
    background: 'white',
    border: '3px solid #E2E8F0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px',
    color: '#666',
    transition: 'all 0.3s ease'
  },
  stepCircleActive: {
    borderColor: '#4299E1',
    background: '#4299E1',
    color: 'white'
  },
  stepCircleCompleted: {
    borderColor: '#7FD99A',
    background: '#7FD99A',
    color: 'white'
  },
  stepLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    maxWidth: '120px'
  },
  documentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    marginBottom: '50px'
  },
  documentCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '35px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    border: '3px solid transparent'
  },
  cardOrange: {
    borderColor: 'rgba(255, 107, 53, 0.2)'
  },
  cardGreen: {
    borderColor: 'rgba(127, 217, 154, 0.2)'
  },
  cardBlue: {
    borderColor: 'rgba(66, 153, 225, 0.2)'
  },
  cardHeader: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    paddingBottom: '25px',
    borderBottom: '2px solid #F7FAFC'
  },
  docIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    flexShrink: 0
  },
  iconOrange: {
    background: 'rgba(255, 140, 66, 0.15)'
  },
  iconGreen: {
    background: 'rgba(127, 217, 154, 0.15)'
  },
  iconBlue: {
    background: 'rgba(66, 153, 225, 0.15)'
  },
  docInfo: {
    flex: 1
  },
  docTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '5px'
  },
  docTitleEn: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    fontWeight: '600'
  },
  docDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5'
  },
  btnDownload: {
    width: '100%',
    padding: '14px 24px',
    background: 'transparent',
    color: '#1A1A1A',
    border: '2px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '25px'
  },
  uploadSection: {
    marginTop: '25px'
  },
  uploadArea: {
    width: '100%',
    padding: '40px 20px',
    background: '#F7FAFC',
    border: '2px dashed #E2E8F0',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  uploadIcon: {
    marginBottom: '15px',
    color: '#666'
  },
  uploadTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  uploadText: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  fileInfo: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500'
  },
  progressBarContainer: {
    marginTop: '20px'
  },
  progressBar: {
    width: '100%',
    height: '10px',
    background: '#F7FAFC',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4299E1, #2B6CB0)',
    borderRadius: '10px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4299E1'
  },
  uploadedFile: {
    padding: '25px',
    background: '#F7FAFC',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  fileIcon: {
    width: '60px',
    height: '60px',
    background: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4299E1',
    flexShrink: 0
  },
  fileDetails: {
    flex: 1
  },
  fileName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '5px'
  },
  fileSize: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px'
  },
  uploadDate: {
    fontSize: '12px',
    color: '#666'
  },
  fileActions: {
    display: 'flex',
    gap: '10px'
  },
  btnIconSuccess: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    background: 'rgba(127, 217, 154, 0.15)',
    color: '#7FD99A'
  },
  btnIconDanger: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#EF4444'
  },
  submitSection: {
    textAlign: 'center'
  },
  successMessage: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '30px',
    background: 'rgba(127, 217, 154, 0.15)',
    color: '#7FD99A'
  },
  warningMessage: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '30px',
    background: 'rgba(255, 140, 66, 0.15)',
    color: '#FF6B35'
  },
  btnSubmit: {
    padding: '18px 60px',
    border: 'none',
    borderRadius: '14px',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px'
  },
  btnSubmitActive: {
    background: 'linear-gradient(135deg, #7FD99A, #A8E6B0)',
    color: 'white',
    boxShadow: '0 6px 30px rgba(127, 217, 154, 0.3)'
  },
  btnSubmitDisabled: {
    background: '#E2E8F0',
    color: '#666',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  submittedCard: {
    background: 'white',
    padding: '60px 40px',
    borderRadius: '24px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center'
  },
  submittedIcon: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #7FD99A, #A8E6B0)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px',
    color: 'white',
    boxShadow: '0 8px 30px rgba(127, 217, 154, 0.4)'
  },
  submittedTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: '15px'
  },
  submittedText: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px'
  },
  submissionInfo: {
    background: '#F7FAFC',
    padding: '25px',
    borderRadius: '16px',
    marginBottom: '30px',
    textAlign: 'left'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E2E8F0'
  },
  infoLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#666'
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'monospace'
  },
  infoStatus: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#7FD99A'
  },
  btnNext: {
    width: '100%',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    boxShadow: '0 6px 30px rgba(255, 107, 53, 0.3)',
    marginBottom: '15px'
  },
  btnEdit: {
    width: '100%',
    padding: '14px 40px',
    background: 'transparent',
    color: '#666',
    border: '2px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

export default DocumentUploadPage;