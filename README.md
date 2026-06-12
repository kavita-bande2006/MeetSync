# MeetSync 🎥

A full-stack video conferencing web application built with React, Node.js, WebRTC, and Socket.IO.

![MeetSync](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![WebRTC](https://img.shields.io/badge/WebRTC-Peer--to--Peer-orange) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen)

---

## 🚀 Features

- 🎥 **Real-time video calls** — peer-to-peer using WebRTC
- 🎤 **Audio/Video controls** — toggle mic and camera mid-call
- 🖥️ **Screen sharing** — share your screen with participants
- 💬 **In-call chat** — send messages during a meeting with unread badge
- 📋 **Meeting history** — view, copy, and rejoin past meetings
- 👥 **Guest access** — join without an account
- 🔐 **Authentication** — register/login with JWT
- 📱 **Responsive grid** — auto-adapts layout based on participant count

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React 18 | UI framework |
| WebRTC | Peer-to-peer video/audio |
| Socket.IO Client | Real-time signaling |
| Material UI | Icons |
| React Router | Navigation |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | REST API server |
| Socket.IO | WebRTC signaling server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
meetsync/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Home/marketing page
│   │   │   ├── Authentication.jsx    # Login & Register
│   │   │   ├── home.jsx              # Dashboard - join/create meeting
│   │   │   ├── videoMeet.jsx         # Meeting room + lobby
│   │   │   └── History.jsx           # Past meetings
│   │   ├── contexts/
│   │   │   └── authContext.jsx       # Auth state management
│   │   ├── utils/
│   │   │   └── withAuth.js           # Protected route HOC
│   │   └── style/
│   │       └── videoComponent.module.css
├── backend/
│   ├── src/
│   │   ├── controllers/             # Route handlers
│   │   ├── models/                  # Mongoose schemas
│   │   ├── routes/                  # API routes
│   │   └── app.js                   # Express + Socket.IO server
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/kavita-bande2006/meetsync.git
cd meetsync
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## 🔌 How It Works

```
User A joins meeting
      ↓
Socket.IO signals User B
      ↓
WebRTC peer connection established
      ↓
Direct video/audio stream between peers
      ↓
Socket.IO handles chat & signaling
```

1. User joins with a meeting code → connects to Socket.IO server
2. Server broadcasts to all users in the room
3. WebRTC `RTCPeerConnection` is created between all peers
4. ICE candidates exchanged via Socket.IO (STUN server for NAT traversal)
5. Direct media stream flows peer-to-peer

---

## 📸 Screenshots

> Add screenshots of each page here after deployment

| Page | Preview |
|------|---------|
| Landing Page | ![landing](#) |
| Login | ![login](#) |
| Lobby | ![lobby](#) |
| Meeting Room | ![meeting](#) |
| History | ![history](#) |

---

## 🌐 Deployment

- **Frontend** — [Vercel](https://vercel.com)
- **Backend** — [Render](https://render.com)
- **Database** — [MongoDB Atlas](https://cloud.mongodb.com)

---

## 📌 Future Improvements

- [ ] Participant name display via WebRTC data channel
- [ ] Virtual backgrounds
- [ ] Meeting recording
- [ ] Waiting room before joining
- [ ] Mobile app (React Native)

---

## 👩‍💻 Author

**Kavita Bande**
- GitHub: [@kavita-bande2006](https://github.com/kavita-bande2006)
- LinkedIn: [linkedin.com/in/kavita-bande-983a5836a](https://linkedin.com/in/kavita-bande-983a5836a)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).