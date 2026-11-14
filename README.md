# MERN Task Manager

## Setup
### Backend
\`\`\`bash
cd backend && npm install
cp .env.example .env   # fill in values
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend && npm install
npm run dev
\`\`\`

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/me | ✅ | Current user |
| GET | /api/tasks | ✅ | List my tasks |
| POST | /api/tasks | ✅ | Create task |
| PUT | /api/tasks/:id | ✅ | Update task |
| DELETE | /api/tasks/:id | ✅ | Delete task |

## Tech Stack
- React + Vite
- Node + Express
- MongoDB + Mongoose
- JWT Authentication