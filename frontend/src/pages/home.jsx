import React, { useState } from "react";
import withAuth from '../utils/withAuth'
import { useNavigate } from "react-router-dom";
import RestoreIcon from '@mui/icons-material/Restore';
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#0d0d14",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        },

        /* ── Navbar ── */
        nav: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            height: "64px",
            background: "#16161f",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        },
        brand: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#a78bfa",
            letterSpacing: "-0.3px",
            margin: 0,
        },
        navRight: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        historyBtn: {
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
        logoutBtn: {
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "6px 14px",
            color: "#a0a0b8",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "inherit",
        },

        /* ── Main content ── */
        main: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
        },
        card: {
            background: "#16161f",
            border: "0.5px solid rgba(167,139,250,0.18)",
            borderRadius: "24px",
            padding: "3rem",
            width: "100%",
            maxWidth: "480px",
            boxSizing: "border-box",
        },
        badge: {
            display: "inline-block",
            background: "rgba(124,92,252,0.15)",
            color: "#a78bfa",
            fontSize: "12px",
            fontWeight: "500",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "1.25rem",
            border: "0.5px solid rgba(124,92,252,0.25)",
        },
        heading: {
            fontSize: "28px",
            fontWeight: "700",
            color: "#e8e8f0",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
        },
        accent: {
            color: "#7c5cfc",
        },
        subtext: {
            fontSize: "14px",
            color: "#6b6b80",
            margin: "0 0 2rem 0",
            lineHeight: 1.6,
        },
        divider: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "1.5rem 0",
        },
        dividerLine: {
            flex: 1,
            height: "0.5px",
            background: "rgba(255,255,255,0.07)",
        },
        dividerText: {
            fontSize: "12px",
            color: "#4a4a5e",
        },
        inputRow: {
            display: "flex",
            gap: "10px",
        },
        input: {
            flex: 1,
            background: "#0d0d14",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "12px 14px",
            fontSize: "14px",
            color: "#e8e8f0",
            outline: "none",
            fontFamily: "inherit",
            letterSpacing: "1px",
        },
        joinBtn: {
            padding: "12px 24px",
            background: "#7c5cfc",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
        },
        newMeetingBtn: {
            width: "100%",
            padding: "12px",
            background: "transparent",
            border: "0.5px solid rgba(124,92,252,0.35)",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#a78bfa",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
        },
        hint: {
            fontSize: "12px",
            color: "#4a4a5e",
            textAlign: "center",
            marginTop: "1.25rem",
        },
    };

    return (
        <div style={styles.page}>

            {/* Navbar */}
            <nav style={styles.nav}>
                <h3 style={styles.brand}>MeetSync</h3>
                <div style={styles.navRight}>
                    <button
                        style={styles.historyBtn}
                        onClick={() => navigate('/history')}
                        onMouseOver={e => e.currentTarget.style.borderColor = "rgba(124,92,252,0.4)"}
                        onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    >
                        <RestoreIcon style={{ fontSize: "16px" }} />
                        History
                    </button>
                    <button
                        style={styles.logoutBtn}
                        onClick={() => { localStorage.removeItem("token"); navigate("/auth"); }}
                        onMouseOver={e => e.currentTarget.style.color = "#f87171"}
                        onMouseOut={e => e.currentTarget.style.color = "#a0a0b8"}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main */}
            <main style={styles.main}>
                <div style={styles.card}>
                    <span style={styles.badge}>✦ Video Conferencing</span>

                    <h1 style={styles.heading}>
                        Meet anyone,<br />
                        <span style={styles.accent}>anywhere.</span>
                    </h1>
                    <p style={styles.subtext}>
                        Enter a meeting code to join an existing call, or start a new one instantly.
                    </p>

                    {/* Join with code */}
                    <div style={styles.inputRow}>
                        <input
                            style={styles.input}
                            placeholder="Enter meeting code"
                            value={meetingCode}
                            onChange={e => setMeetingCode(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleJoinVideoCall()}
                            onFocus={e => e.target.style.borderColor = "rgba(124,92,252,0.5)"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                        <button
                            style={styles.joinBtn}
                            onClick={handleJoinVideoCall}
                            onMouseOver={e => e.currentTarget.style.background = "#6d4ef0"}
                            onMouseOut={e => e.currentTarget.style.background = "#7c5cfc"}
                        >
                            Join
                        </button>
                    </div>

                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span style={styles.dividerText}>or</span>
                        <div style={styles.dividerLine} />
                    </div>

                    {/* New meeting */}
                    <button
                        style={styles.newMeetingBtn}
                        onClick={() => {
                            const code = Math.random().toString(36).substring(2, 10);
                            setMeetingCode(code);
                            navigate(`/${code}`);
                        }}
                        onMouseOver={e => e.currentTarget.style.background = "rgba(124,92,252,0.08)"}
                        onMouseOut={e => e.currentTarget.style.background = "transparent"}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 10l4.553-2.069A1 1 0 0121 8.876v6.248a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        New instant meeting
                    </button>

                    <p style={styles.hint}>Share the meeting code with others to invite them</p>
                </div>
            </main>
        </div>
    );
}

export default withAuth(HomeComponent);