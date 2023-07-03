## About project
CRUD type project to manage tasks created with ExpressJS and PrismaORM in the backend, and ReactJS and Axios in the frontend.

<h2 align="center">SETUP PROJECT</h2>

```bash
cd backend 
npm install
touch .env

# .env
DATABASE_URL="Link to database" 
# About more https://www.prisma.io/docs/concepts/database-connectors#in-this-section

prisma migrate dev
npm run dev
----------- // ----------- // -------------
cd frontend
npm install
npm run dev
```