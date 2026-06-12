import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import style from "../style/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import server from '../environment';
import "../App.css";

const server_url = server;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState(false);
    let [audio, setAudio] = useState(false);
    let [screen, setScreen] = useState();
    let [showModal, setModal] = useState(true);
    const showModalRef = useRef(true);
    let [screenAvailable, setScreenAvailable] = useState(!!navigator.mediaDevices?.getDisplayMedia);
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");
    const videoRef = useRef([])
    let [videos, setVideos] = useState([])

    useEffect(() => {
        getPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) { setVideoAvailable(true); } else { setVideoAvailable(false); }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) { setAudioAvailable(true); } else { setAudioAvailable(false); }

            if (navigator.mediaDevices.getDisplayMedia) { setScreenAvailable(true); } else { setScreenAvailable(false); }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) { localVideoref.current.srcObject = userMediaStream; }
                }
            }
        } catch (error) { console.log(error); }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
       
    }, [video, audio])

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let getUserMediaSuccess = (stream) => {
        try { window.localStream.getTracks().forEach(track => track.stop()) } catch (e) { console.log(e) }
        window.localStream = stream
        localVideoref.current.srcObject = stream
        for (let id in connections) {
            if (id === socketIdRef.current) continue
            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => { socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription })) })
                    .catch(e => console.log(e))
            })
        }
        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false); setAudio(false);
            try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach(track => track.stop()) } catch (e) { console.log(e) }
            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream
            for (let id in connections) {
                connections[id].addStream(window.localStream)
                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => { socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription })) })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess).then((stream) => { }).catch((e) => console.log(e))
        } else {
            try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach(track => track.stop()) } catch (e) { }
        }
    }

    let getDislayMediaSuccess = (stream) => {
        try { window.localStream.getTracks().forEach(track => track.stop()) } catch (e) { console.log(e) }
        window.localStream = stream
        localVideoref.current.srcObject = stream
        for (let id in connections) {
            if (id === socketIdRef.current) continue
            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => { socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription })) })
                    .catch(e => console.log(e))
            })
        }
        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)
            try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach(track => track.stop()) } catch (e) { console.log(e) }
            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream
            getUserMedia()
        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)
        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }
            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })
        socketRef.current.on('signal', gotMessageFromServer)
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id
            socketRef.current.on('chat-message', addMessage)
            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })
            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }
                    connections[socketListId].onaddstream = (event) => {
                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);
                        if (videoExists) {
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            let newVideo = { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true };
                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })
                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue
                        try { connections[id2].addStream(window.localStream) } catch (e) { }
                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => { socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription })) })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }

    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => { setVideo(!video); }
    let handleAudio = () => { setAudio(!audio) }

    useEffect(() => {
        if (screen !== undefined) { getDislayMedia(); }
        
    }, [screen])

    let handleScreen = () => {
        if (screen) {
            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { console.log(e) }
            getUserMedia();
        }
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach(track => track.stop()) } catch (e) { }
        window.location.href = "/"
    }


    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [...prevMessages, { sender: sender, data: data }]);
        if (socketIdSender !== socketIdRef.current && !showModalRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    let sendMessage = () => {
        socketRef.current.emit('chat-message', message, username)
        setMessage("");
    }

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }

    /* ── Lobby screen styles ── */
    const ls = {
        page: {
            minHeight: "100vh",
            background: "#0d0d14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        },
        card: {
            background: "#16161f",
            border: "0.5px solid rgba(167,139,250,0.18)",
            borderRadius: "20px",
            padding: "2rem",
            width: "100%",
            maxWidth: "460px",
            boxSizing: "border-box",
        },
        brand: {
            fontSize: "15px",
            fontWeight: "600",
            color: "#7c5cfc",
            marginBottom: "1.5rem",
            letterSpacing: "-0.3px",
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
            margin: "0 0 1.5rem 0",
        },
        videoWrap: {
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "#0d0d14",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "1.25rem",
            border: "0.5px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        video: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
        },
        camOffLabel: {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "#4a4a5e",
            fontSize: "13px",
        },
        inputRow: {
            display: "flex",
            gap: "10px",
            alignItems: "center",
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
        },
        connectBtn: {
            padding: "12px 24px",
            background: "#7c5cfc",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            whiteSpace: "nowrap",
        },
    };

    /* ── Chat message styles ── */
    const msgStyle = {
        wrap: { marginBottom: "16px" },
        sender: { fontSize: "12px", fontWeight: "500", color: "#7c5cfc", margin: "0 0 3px 0" },
        text: { fontSize: "14px", color: "#c8c8d8", margin: 0, lineHeight: 1.5 },
    };

    return (
        <div>
            {askForUsername === true ? (

                /* ────────── LOBBY ────────── */
                <div style={ls.page}>
                    <div style={ls.card}>
                        <p style={ls.brand}>MeetSync</p>
                        <h2 style={ls.heading}>Ready to join?</h2>
                        <p style={ls.subtext}>Check your camera preview and enter a display name</p>

                        <div style={ls.videoWrap}>
                            <video ref={localVideoref} autoPlay muted style={ls.video} />
                            {/* Show avatar when camera is off */}
                            {!videoAvailable && (
                                <div style={ls.camOffLabel}>
                                    <div style={{
                                        width: "72px",
                                        height: "72px",
                                        borderRadius: "50%",
                                        background: "#7c5cfc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        color: "#fff",
                                        marginBottom: "8px",
                                    }}>
                                        {username ? username.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <span style={{ fontSize: "13px", color: "#6b6b80" }}>Camera is off</span>
                                </div>
                            )}
                        </div>

                        <div style={ls.inputRow}>
                            <input
                                style={ls.input}
                                placeholder="Your display name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && username && connect()}
                            />
                            <button
                                style={ls.connectBtn}
                                onClick={connect}
                                onMouseOver={e => e.target.style.background = "#6d4ef0"}
                                onMouseOut={e => e.target.style.background = "#7c5cfc"}
                            >
                                Join now
                            </button>
                        </div>
                    </div>
                </div>

            ) : (

                /* ────────── MEETING ROOM ────────── */
                <div className={style.meetVideoContainer}>

                    {/* Chat panel */}
                    {showModal &&
                        <div className={style.chatRoom}>
                            <div className={style.chatContainer}>
                                <h1>Chat</h1>

                                <div className={style.chattingDisplay}>
                                    {messages.length !== 0 ? messages.map((item, index) => (
                                        <div style={msgStyle.wrap} key={index}>
                                            <p style={msgStyle.sender}>{item.sender}</p>
                                            <p style={msgStyle.text}>{item.data}</p>
                                        </div>
                                    )) : (
                                        <p style={{ color: "#4a4a5e", fontSize: "13px", textAlign: "center", marginTop: "2rem" }}>
                                            No messages yet
                                        </p>
                                    )}
                                </div>

                                <div className={style.chattingArea}>
                                    <TextField
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                                        placeholder="Message..."
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            flex: 1,
                                            "& .MuiOutlinedInput-root": {
                                                background: "#0d0d14",
                                                borderRadius: "8px",
                                                color: "#e8e8f0",
                                                fontSize: "13px",
                                                "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                                "&:hover fieldset": { borderColor: "rgba(124,92,252,0.4)" },
                                                "&.Mui-focused fieldset": { borderColor: "#7c5cfc" },
                                            },
                                        }}
                                    />
                                    <IconButton
                                        onClick={sendMessage}
                                        sx={{
                                            background: "#7c5cfc",
                                            borderRadius: "8px",
                                            padding: "8px",
                                            color: "#fff",
                                            "&:hover": { background: "#6d4ef0" },
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                                        </svg>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Control bar */}
                    <div className={style.buttonContainers}>
                        <IconButton onClick={handleVideo} sx={{ color: video ? "#fff" : "#f87171", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px", "&:hover": { background: "rgba(255,255,255,0.12)" } }}>
                            {video === true ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>

                        <IconButton onClick={handleAudio} sx={{ color: audio ? "#fff" : "#f87171", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px", "&:hover": { background: "rgba(255,255,255,0.12)" } }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        <IconButton onClick={handleEndCall} sx={{ color: "#fff", background: "#e53935", borderRadius: "12px", padding: "10px", "&:hover": { background: "#c62828" } }}>
                            <CallEndIcon />
                        </IconButton>

                        {screenAvailable &&
                            <IconButton onClick={handleScreen} sx={{ color: screen ? "#7c5cfc" : "#fff", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px", "&:hover": { background: "rgba(255,255,255,0.12)" } }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton>
                        }

                        <Badge badgeContent={newMessages} max={999} color="error">
                            <IconButton onClick={() => { const next = !showModal; showModalRef.current = next; setModal(next); if (next) setNewMessages(0); }} sx={{ color: showModal ? "#7c5cfc" : "#fff", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px", "&:hover": { background: "rgba(255,255,255,0.12)" } }}>
                                <ChatIcon />
                            </IconButton>
                        </Badge>
                    </div>

                    {/* Local PiP video */}
                    <div style={{ position: "absolute", bottom: "82px", left: "16px", zIndex: 25 }}>
                        <video className={style.meetUserVideo} ref={localVideoref} autoPlay muted style={{ display: "block", margin: 0 }} />
                        <div style={{
                            position: "absolute",
                            bottom: "6px",
                            left: "8px",
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(6px)",
                            borderRadius: "5px",
                            padding: "2px 8px",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#e8e8f0",
                        }}>
                            {username || "You"} (You)
                        </div>
                    </div>

                    {/* Remote videos grid */}
                    <div
                        className={`${style.conferenceView} ${showModal ? style.conferenceViewWithChat : ''}`}
                        style={{
                            gridTemplateColumns: videos.length === 1 ? '1fr' :
                                                 videos.length === 2 ? 'repeat(2, 1fr)' :
                                                 videos.length <= 4 ? 'repeat(2, 1fr)' :
                                                 'repeat(3, 1fr)',
                        }}
                    >
                        {videos.map((video) => (
                            <div key={video.socketId} style={{
                                height: videos.length === 1 ? '70vh' :
                                        videos.length === 2 ? '60vh' :
                                        '40vh',
                                maxHeight: '500px',
                                position: "relative",
                            }}>
                                <video
                                    data-socket={video.socketId}
                                    ref={ref => { if (ref && video.stream) { ref.srcObject = video.stream; } }}
                                    autoPlay
                                    style={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover", background: "#16161f" }}
                                />
                                {/* Participant name label */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px",
                                    background: "rgba(0,0,0,0.55)",
                                    backdropFilter: "blur(6px)",
                                    borderRadius: "6px",
                                    padding: "3px 10px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    color: "#e8e8f0",
                                }}>
                                    {video.username || video.socketId.slice(0, 6)}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    )
}