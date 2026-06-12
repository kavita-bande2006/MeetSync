import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
    const router = useNavigate();

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#0d0d14",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
            color: "#e8e8f0",
        },
        nav: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2.5rem",
            height: "64px",
            background: "rgba(22,22,31,0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
            position: "sticky",
            top: 0,
            zIndex: 100,
        },
        brand: {
            fontSize: "20px",
            fontWeight: "700",
            color: "#a78bfa",
            letterSpacing: "-0.5px",
            margin: 0,
        },
        navLinks: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        navLink: {
            background: "transparent",
            border: "none",
            color: "#a0a0b8",
            fontSize: "14px",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "6px 12px",
            borderRadius: "8px",
        },
        loginBtn: {
            background: "transparent",
            border: "0.5px solid rgba(124,92,252,0.4)",
            borderRadius: "8px",
            padding: "7px 18px",
            color: "#a78bfa",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
        },
        hero: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "4rem 2rem",
            gap: "1.5rem",
        },
        badge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(124,92,252,0.12)",
            border: "0.5px solid rgba(124,92,252,0.25)",
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "12px",
            color: "#a78bfa",
            fontWeight: "500",
        },
        heading: {
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: "800",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-1.5px",
            maxWidth: "700px",
        },
        accent: { color: "#7c5cfc" },
        subtext: {
            fontSize: "16px",
            color: "#6b6b80",
            maxWidth: "460px",
            lineHeight: 1.7,
            margin: 0,
        },
        ctaRow: {
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        primaryBtn: {
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#7c5cfc",
            color: "#fff",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            padding: "12px 28px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
        },
        secondaryBtn: {
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.12)",
            borderRadius: "10px",
            padding: "12px 24px",
            color: "#a0a0b8",
            fontSize: "15px",
            cursor: "pointer",
            fontFamily: "inherit",
        },
        pills: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "0.5rem",
        },
        pill: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#16161f",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#6b6b80",
        },
        previewWrap: {
            width: "100%",
            maxWidth: "780px",
            margin: "1rem auto 0",
            background: "#16161f",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            overflow: "hidden",
        },
        previewBar: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        },
        previewGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            padding: "12px",
        },
        previewControls: {
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "12px",
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
        },

        /* ── Footer ── */
        footer: {
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            padding: "2rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            background: "#16161f",
        },
        footerLeft: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
        },
        footerBrand: {
            fontSize: "16px",
            fontWeight: "700",
            color: "#a78bfa",
            margin: 0,
            letterSpacing: "-0.3px",
        },
        footerTagline: {
            fontSize: "12px",
            color: "#4a4a5e",
            margin: 0,
        },
        footerLinks: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
        },
        footerLink: {
            fontSize: "13px",
            color: "#6b6b80",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontFamily: "inherit",
            padding: 0,
        },
        footerRight: {
            fontSize: "12px",
            color: "#4a4a5e",
            margin: 0,
        },
        socialBtn: {
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            border: "0.5px solid rgba(255,255,255,0.1)",
            background: "transparent",
            color: "#6b6b80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            transition: "border-color 0.15s, color 0.15s",
        },
    };

    const avatars = ["👩‍💻", "👨‍💼", "👩‍🎨", "👨‍🔬", "🧑‍💻", "👩‍🏫"];
    const tileColors = ["#1a1a2e", "#16213e", "#1a1a2e"];
    const controls = [
        ["🎥", "rgba(255,255,255,0.07)"],
        ["🎤", "rgba(255,255,255,0.07)"],
        ["📵", "#e53935"],
        ["🖥️", "rgba(255,255,255,0.07)"],
        ["💬", "rgba(124,92,252,0.25)"],
    ];

    return (
        <div style={styles.page}>

            {/* Navbar */}
            <nav style={styles.nav}>
                <h2 style={styles.brand}>MeetSync</h2>
                <div style={styles.navLinks}>
                    <button
                        style={styles.navLink}
                        onClick={() => router("/aljk23")}
                        onMouseOver={e => e.currentTarget.style.color = "#e8e8f0"}
                        onMouseOut={e => e.currentTarget.style.color = "#a0a0b8"}
                    >
                        Join as Guest
                    </button>
                    <button
                        style={styles.navLink}
                        onClick={() => router("/auth")}
                        onMouseOver={e => e.currentTarget.style.color = "#e8e8f0"}
                        onMouseOut={e => e.currentTarget.style.color = "#a0a0b8"}
                    >
                        Register
                    </button>
                    <button
                        style={styles.loginBtn}
                        onClick={() => router("/auth")}
                        onMouseOver={e => e.currentTarget.style.background = "rgba(124,92,252,0.1)"}
                        onMouseOut={e => e.currentTarget.style.background = "transparent"}
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section style={styles.hero}>
                <div style={styles.badge}>
                    <span>✦</span> Free to use · No downloads needed
                </div>

                <h1 style={styles.heading}>
                    Video meetings for<br />
                    <span style={styles.accent}>everyone.</span>
                </h1>

                <p style={styles.subtext}>
                    High quality, secure, and lightning fast video calls.
                    Connect with anyone, anywhere — right from your browser.
                </p>

                <div style={styles.ctaRow}>
                    <Link
                        to="/home"
                        style={styles.primaryBtn}
                        onMouseOver={e => e.currentTarget.style.background = "#6d4ef0"}
                        onMouseOut={e => e.currentTarget.style.background = "#7c5cfc"}
                    >
                        Get started
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <button
                        style={styles.secondaryBtn}
                        onClick={() => router("/aljk23")}
                        onMouseOver={e => e.currentTarget.style.color = "#e8e8f0"}
                        onMouseOut={e => e.currentTarget.style.color = "#a0a0b8"}
                    >
                        Join as guest
                    </button>
                </div>

                {/* Feature pills */}
                <div style={styles.pills}>
                    {["🔒 End-to-end encrypted", "⚡ No lag", "💬 Built-in chat", "🖥️ Screen sharing"].map((f, i) => (
                        <div key={i} style={styles.pill}>{f}</div>
                    ))}
                </div>

                {/* Mock video preview */}
                <div style={styles.previewWrap}>
                    <div style={styles.previewBar}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                        <span style={{ fontSize: "12px", color: "#4a4a5e", marginLeft: "8px" }}>
                            MeetSync — Team standup
                        </span>
                    </div>
                    <div style={styles.previewGrid}>
                        {avatars.map((a, i) => (
                            <div key={i} style={{
                                height: "100px",
                                borderRadius: "10px",
                                background: tileColors[i % 3],
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "28px",
                            }}>
                                {a}
                            </div>
                        ))}
                    </div>
                    <div style={styles.previewControls}>
                        {controls.map(([icon, bg], i) => (
                            <div key={i} style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background: bg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                            }}>
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerLeft}>
                    <p style={styles.footerBrand}>MeetSync</p>
                    <p style={styles.footerTagline}>High quality video meetings for everyone</p>
                </div>

                <div style={styles.footerLinks}>
                    {["Join as Guest", "Register", "Login"].map((label, i) => (
                        <button
                            key={i}
                            style={styles.footerLink}
                            onClick={() => router(label === "Join as Guest" ? "/aljk23" : "/auth")}
                            onMouseOver={e => e.currentTarget.style.color = "#a78bfa"}
                            onMouseOut={e => e.currentTarget.style.color = "#6b6b80"}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    {/* Social icons */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialBtn}
                            onMouseOver={e => { e.currentTarget.style.borderColor = "#0a66c2"; e.currentTarget.style.color = "#0a66c2"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6b80"; }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialBtn}
                            onMouseOver={e => { e.currentTarget.style.borderColor = "#e1306c"; e.currentTarget.style.color = "#e1306c"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6b80"; }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                        </a>
                        {/* Twitter/X */}
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialBtn}
                            onMouseOver={e => { e.currentTarget.style.borderColor = "#1da1f2"; e.currentTarget.style.color = "#1da1f2"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6b80"; }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        {/* Telegram */}
                        <a href="https://telegram.org" target="_blank" rel="noreferrer" style={styles.socialBtn}
                            onMouseOver={e => { e.currentTarget.style.borderColor = "#229ed9"; e.currentTarget.style.color = "#229ed9"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6b80"; }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </a>
                    </div>
                    <p style={styles.footerRight}>© {new Date().getFullYear()} MeetSync. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}