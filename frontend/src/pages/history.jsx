import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                
            }
        }
        fetchHistory();
        
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#0d0d14",
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
            display: "flex",
            flexDirection: "column",
        },
        nav: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 2rem",
            height: "64px",
            background: "#16161f",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        },
        backBtn: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "6px 14px",
            color: "#a0a0b8",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "inherit",
        },
        brand: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#a78bfa",
            letterSpacing: "-0.3px",
            margin: 0,
        },
        main: {
            flex: 1,
            padding: "2rem",
            maxWidth: "680px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
        },
        header: {
            marginBottom: "1.5rem",
        },
        heading: {
            fontSize: "22px",
            fontWeight: "600",
            color: "#e8e8f0",
            margin: "0 0 6px 0",
        },
        subtext: {
            fontSize: "13px",
            color: "#6b6b80",
            margin: 0,
        },
        list: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        card: {
            background: "#16161f",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "border-color 0.15s",
        },
        cardLeft: {
            display: "flex",
            alignItems: "center",
            gap: "14px",
        },
        iconWrap: {
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "rgba(124,92,252,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },
        code: {
            fontSize: "14px",
            fontWeight: "500",
            color: "#e8e8f0",
            margin: "0 0 3px 0",
            letterSpacing: "0.5px",
        },
        date: {
            fontSize: "12px",
            color: "#6b6b80",
            margin: 0,
        },
        rejoinBtn: {
            background: "transparent",
            border: "0.5px solid rgba(124,92,252,0.35)",
            borderRadius: "8px",
            padding: "6px 14px",
            color: "#a78bfa",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
        },
        copyBtn: {
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "6px 12px",
            color: "#6b6b80",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
        },
        cardActions: {
            display: "flex",
            gap: "8px",
            alignItems: "center",
        },
        empty: {
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#4a4a5e",
        },
        emptyIcon: {
            fontSize: "40px",
            marginBottom: "12px",
        },
        emptyText: {
            fontSize: "15px",
            color: "#6b6b80",
            margin: "0 0 6px 0",
        },
        emptySubtext: {
            fontSize: "13px",
            color: "#4a4a5e",
            margin: 0,
        },
    };

    const handleCopy = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    }

    return (
        <div style={styles.page}>

            {/* Navbar */}
            <nav style={styles.nav}>
                <button
                    style={styles.backBtn}
                    onClick={() => routeTo("/home")}
                    onMouseOver={e => e.currentTarget.style.borderColor = "rgba(124,92,252,0.4)"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                >
                    <HomeIcon style={{ fontSize: "16px" }} />
                    Home
                </button>
                <h3 style={styles.brand}>MeetSync</h3>
            </nav>

            {/* Content */}
            <main style={styles.main}>
                <div style={styles.header}>
                    <h2 style={styles.heading}>Meeting history</h2>
                    <p style={styles.subtext}>
                        {meetings.length > 0
                            ? `${meetings.length} meeting${meetings.length !== 1 ? 's' : ''} found`
                            : "Your past meetings will appear here"}
                    </p>
                </div>

                {meetings.length !== 0 ? (
                    <div style={styles.list}>
                        {meetings.map((e, i) => (
                            <div
                                key={i}
                                style={styles.card}
                                onMouseOver={el => el.currentTarget.style.borderColor = "rgba(124,92,252,0.35)"}
                                onMouseOut={el => el.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                            >
                                <div style={styles.cardLeft}>
                                    <div style={styles.iconWrap}>
                                        <VideocamIcon style={{ fontSize: "18px", color: "#7c5cfc" }} />
                                    </div>
                                    <div>
                                        <p style={styles.code}>{e.meetingCode}</p>
                                        <p style={styles.date}>{formatDate(e.date)}</p>
                                    </div>
                                </div>
                                <div style={styles.cardActions}>
                                    <button
                                        style={{
                                            ...styles.copyBtn,
                                            ...(copiedIndex === i ? { color: "#4ade80", borderColor: "rgba(74,222,128,0.3)" } : {})
                                        }}
                                        onClick={() => handleCopy(e.meetingCode, i)}
                                    >
                                        {copiedIndex === i ? (
                                            <>✓ Copied</>
                                        ) : (
                                            <>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                    <button
                                        style={styles.rejoinBtn}
                                        onClick={() => routeTo(`/${e.meetingCode}`)}
                                        onMouseOver={el => el.currentTarget.style.background = "rgba(124,92,252,0.08)"}
                                        onMouseOut={el => el.currentTarget.style.background = "transparent"}
                                    >
                                        Rejoin
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>📋</div>
                        <p style={styles.emptyText}>No meetings yet</p>
                        <p style={styles.emptySubtext}>Join or start a meeting to see your history here</p>
                    </div>
                )}
            </main>
        </div>
    );
}