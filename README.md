# MediQueue — Backend API

REST API for the MediQueue tutor booking platform.

## 🌐 Live API
**[https://mediqueue-server-f4dh.onrender.com](https://mediqueue-server-f4dh.onrender.com)**
## 🌐 Repository Link
**[https://github.com/code-samid/mediqueue-server](https://github.com/code-samid/mediqueue-server)**

## 🛠️ Tech Stack

- **Runtime:** Node.js + Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JSON Web Token (JWT)
- **Deploy:** Render

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/jwt` | Generate JWT token |

### Tutors
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/tutors` | ❌ | Get all tutors with search and date filter |
| GET | `/tutors/:id` | ❌ | Get single tutor |
| GET | `/tutors/my-tutors?email=` | ✅ | Get tutors by user |
| POST | `/tutors` | ✅ | Add new tutor |
| PUT | `/tutors/:id` | ✅ | Update tutor |
| DELETE | `/tutors/:id` | ✅ | Delete tutor |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/bookings` | ❌ | Create booking and decrease slot |
| GET | `/bookings?email=` | ✅ | Get bookings by student |
| PATCH | `/bookings/:id` | ❌ | Cancel booking |

## 🚀 Run Locally

```bash
git https://github.com/code-samid/mediqueue-server.git
cd mediqueue-server
npm install
npm run dev
```

## 🔑 Environment Variables

Create `.env`:

```env
MONGODB_URI=mongodb+srv://tutornova:tutornova123@cluster0.xb8fi9t.mongodb.net/tutornova?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=8000
```

## 🔗 Related

- **Frontend:** [mediqueue-client](https://github.com/code-samid/mediqueue-client)
- **Live Site:** [https://mediqueue-client-omega.vercel.app](https://mediqueue-client-omega.vercel.app)

---
- **Author:**
 Samid Ahmed