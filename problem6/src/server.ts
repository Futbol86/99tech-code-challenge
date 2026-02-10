import http from 'http';
import dotenv from 'dotenv';
import app from './app.ts';
import connectDb from './config/database.ts';
dotenv.config();

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    console.log("--- process.env.MONGO_URI in server.ts", process.env.MONGO_URI);
    await connectDb();
    const server = http.createServer(app);  
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
