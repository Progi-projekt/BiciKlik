// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import sequelize from './config/database';

const app: Application = express();
var db_connected: boolean = false;


sequelize.authenticate()
.then(() => {
    console.log('Connected to the database');
    db_connected = true;
})
.catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

// Middleware to parse JSON
app.use(express.json());

// Serve static files (e.g., for a React frontend build)
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// API route example
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// DB health check
app.get('/db/health', (req, res) => {
    if (db_connected) {
        res.json({ status: 'OK' });
    } else {
        res.json({ status: 'ERROR' });
    }
});

// Serve React frontend (if integrated)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log the error stack to console (optional)
    res.status(500).send('Something broke!'); // Respond with a generic error message
});

export default app;