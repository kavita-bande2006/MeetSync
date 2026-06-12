import React from "react";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState(0);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessages] = useState("");
  const [open, setOpen] = useState(false);
  const router = useNavigate();

  const validate = () => {
    const e = {};
    if (formState === 1 && !name) e.name = "Full name is required.";
    if (!username) e.username = "Username is required.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    try {
      if (formState === 0) {
        await handleLogin(username, password);
        router("/home");
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setMessages(result);
        setUsername("");
        setOpen(true);
        setErrors({});
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      setErrors({ message: err.response?.data?.message || "Something went wrong" });
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0d0d14",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      padding: "2rem 1rem",
    },
    brand: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#a78bfa",
      letterSpacing: "-0.5px",
      marginBottom: "2rem",
    },
    card: {
      background: "#16161f",
      border: "0.5px solid rgba(167,139,250,0.18)",
      borderRadius: "16px",
      padding: "2rem 2rem 1.75rem",
      width: "100%",
      maxWidth: "360px",
      boxSizing: "border-box",
    },
    tabs: {
      display: "flex",
      background: "#0d0d14",
      borderRadius: "10px",
      padding: "4px",
      marginBottom: "1.75rem",
      gap: "4px",
    },
    tabActive: {
      flex: 1,
      padding: "8px",
      border: "none",
      borderRadius: "7px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      background: "#7c5cfc",
      color: "#fff",
    },
    tabInactive: {
      flex: 1,
      padding: "8px",
      border: "none",
      borderRadius: "7px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      background: "transparent",
      color: "#6b6b80",
    },
    inputWrap: {
      position: "relative",
      marginBottom: "6px",
    },
    inputInner: {
      position: "relative",
    },
    input: (hasError) => ({
      width: "100%",
      boxSizing: "border-box",
      background: "#0d0d14",
      border: hasError ? "0.5px solid #f87171" : "0.5px solid rgba(255,255,255,0.1)",
      borderRadius: "9px",
      padding: "11px 12px 11px 38px",
      fontSize: "14px",
      color: "#e8e8f0",
      outline: "none",
    }),
    inputIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "16px",
      color: "#6b6b80",
      pointerEvents: "none",
      lineHeight: 1,
    },
    errorText: {
      color: "#f87171",
      fontSize: "12px",
      margin: "5px 0 6px 4px",
    },
    globalError: {
      color: "#f87171",
      fontSize: "13px",
      textAlign: "center",
      marginBottom: "12px",
      background: "rgba(248,113,113,0.08)",
      borderRadius: "8px",
      padding: "8px 12px",
    },
    rememberRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "1.25rem",
    },
    rememberLabel: {
      fontSize: "13px",
      color: "#6b6b80",
      cursor: "pointer",
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      background: "#7c5cfc",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      letterSpacing: "0.2px",
    },
    divider: {
      border: "none",
      borderTop: "0.5px solid rgba(255,255,255,0.07)",
      margin: "1.25rem 0 1rem",
    },
    guestRow: {
      textAlign: "center",
      fontSize: "13px",
      color: "#4a4a5e",
    },
    guestLink: {
      color: "#7c5cfc",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.brand}>MeetSync</div>

      <div style={styles.card}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={formState === 0 ? styles.tabActive : styles.tabInactive}
            onClick={() => { setFormState(0); setErrors({}); }}
          >
            Sign in
          </button>
          <button
            style={formState === 1 ? styles.tabActive : styles.tabInactive}
            onClick={() => { setFormState(1); setErrors({}); }}
          >
            Sign up
          </button>
        </div>

        
        {errors.message && (
          <div style={styles.globalError}>{errors.message}</div>
        )}

        
        {formState === 1 && (
          <div style={styles.inputWrap}>
            <div style={styles.inputInner}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input(!!errors.name)}
              />
            </div>
            {errors.name && <p style={styles.errorText}>{errors.name}</p>}
          </div>
        )}

        {/* Username */}
        <div style={styles.inputWrap}>
          <div style={styles.inputInner}>
            <span style={styles.inputIcon}>@</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input(!!errors.username)}
            />
          </div>
          {errors.username && <p style={styles.errorText}>{errors.username}</p>}
        </div>

        {/* Password */}
        <div style={styles.inputWrap}>
          <div style={styles.inputInner}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input(!!errors.password)}
            />
          </div>
          {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        </div>

        {/* Remember me */}
        <div style={styles.rememberRow}>
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
            style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#7c5cfc" }}
          />
          <label htmlFor="remember" style={styles.rememberLabel}>
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleAuth}
          style={styles.submitBtn}
          onMouseOver={(e) => (e.target.style.background = "#6d4ef0")}
          onMouseOut={(e) => (e.target.style.background = "#7c5cfc")}
        >
          {formState === 0 ? "Sign in" : "Create account"}
        </button>

        <hr style={styles.divider} />
        <div style={styles.guestRow}>
          or{" "}
          <span style={styles.guestLink} onClick={() => router("/")}>
            join as guest
          </span>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}