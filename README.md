Aurora CS Course Scheduler
CSC 3700 — Advanced Web Application Development | Milestone 1
Authors: Andres Alvarado and Jacob Chilelli
Aurora University — Fall 2026
Overview
A React application that displays the Aurora CS Developer Track course catalog and helps students track completed courses and identify which courses they can take next based on prerequisites.
--------------------------------------------------------------------------------------------------------------------------
  Setup and running the project
1. Open WebStorm and clone the GitHub repository using the following command in the terminal:
   git clone https://github.com/andres3531/CSC-3700-Group-Project.git
   Once the repository has been cloned, open the downloaded project folder in WebStorm. If you are using the terminal, you can enter the folder with:
   cd CSC-3700-Group-Project
   Make sure you are inside the project folder before running the remaining commands.

2. Install the dependencies with:
   npm install

3. Check that the .env file in the project root contains:
   VITE_API_BASE_URL=http://localhost:3333

4. Terminal 1: From the project root, start JSON Server:
   npx json-server --watch db/db.json --port 3333
   The course data should be available at http://localhost:3333/courses.

5. Terminal 2: Start a new terminal, then start the React application:
   npm run dev

6. Open the local URL shown by Vite (typically http://localhost:5173). Keep both terminals running while using the application.
   Features
