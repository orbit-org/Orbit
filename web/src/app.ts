import signin from '@routes/auth/sign-in/route';
import signup from '@routes/auth/sign-up/route';
import health from '@routes/health/route';
import interests from '@routes/interests/route';
import user from '@routes/user/route';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const authLimiter = rateLimit({
   windowMs: 60000 * 60, // 1 hour
   max: 10 // 10 requests
});

app.use(express.json())
app.use('/api/health', health)
app.use('/api/auth/sign-in', authLimiter, signin)
app.use('/api/auth/sign-up', authLimiter, signup)
app.use('/api/interests', interests)
app.use('/api/user', user)
app.use('*', (_, res) => { res.end('404 not found').status(404) })

app.listen(port, () => { console.log(`⚡[server]: server is running on port: http://localhost:${port}`) }) //TODO REMOVE IN PRODUCTION

export default app
