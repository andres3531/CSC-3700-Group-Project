Aurora CS Course Scheduler\
CSC 3700 — Advanced Web Application Development — Milestone 2\
Authors: Andres Alvarado and Jacob Chilelli\
Aurora University — Fall 2026\
Overview:\
This course scheduler displays the Aurora CS Developer Track and helps a student track completed courses and prerequisites.\Milestone 2 replaces the Milestone 1 JSON Server and browser localStorage with a Node.js/Express REST API backed by MySQL.

  Setup from a fresh clone
1. Clone the Milestone 2 branch
   git clone --branch milestone-2 --single-branch https://github.com/andres3531/CSC-3700-Group-Project.git
   cd CSC-3700-Group-Project
2. Configure the frontend
   Create a .env file in the project root containing:
   VITE_API_BASE_URL=http://localhost:3000
   The frontend uses this URL for /api/courses and /api/completions.
3. Configure the Express server
   Copy server/.env.example to server/.env. Replace the placeholder database values with the credentials provided for your own MySQL database.
   Important: Do not put a trailing / after http://localhost:5173. 
4. Install dependencies
   From the project root:
   npm install
   cd server
   npm install
   The frontend and Express server have separate package.json files.
5. Start both applications
   Terminal 1 — backend, from inside server/:
   npm run dev
   Express runs at http://localhost:3000.

Terminal 2 — frontend, from the project root:
npm run dev
Open the local URL shown by Vite, normally http://localhost:5173. Keep both terminals running.
