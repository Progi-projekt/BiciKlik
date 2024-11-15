import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import sequelize from './config/database';
import dotenv from 'dotenv';
import mockRouter from './routes/mockRoutes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRouter from './routes/oauth.router';
import eventRouter from './routes/event.router';
import { getLastTenEvents } from './services/event.service';
import { json } from 'sequelize';

dotenv.config();

const app: Application = express();
var db_connected: boolean = false;

sequelize.authenticate()
    .then(async () => {
        await sequelize.sync({ force: false });
        console.log('Connected to the database');
        db_connected = true;

        // Insert initial data into the database
        try {
            // Call your bulkInsert functions here
            await insertInitialData();
            console.log('Initial data inserted successfully');
        } catch (error) {
            console.error('Error inserting initial data:', error);
        }
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

    async function insertInitialData() {
        const { insertRoutes, insertEvents, insertOrganizers } = require('./config/database.insert');
        await insertOrganizers(sequelize.getQueryInterface());
        await insertRoutes(sequelize.getQueryInterface());
        await insertEvents(sequelize.getQueryInterface());
    }

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use('/images', express.static(path.join(__dirname, '../../static/images')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.use('/auth', authRouter);
app.use('/mock', mockRouter);
app.use('/event', eventRouter);

app.get('/db/health', (req, res) => {
    if (db_connected) {
        res.json({ status: 'OK' });
    } else {
        res.json({ status: 'ERROR' });
    }
});

app.get('/db/createEvent', (req, res) => {
    


})

app.get('/db/getEvents', (req, res) => {
    let events = getLastTenEvents()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist', 'index.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;