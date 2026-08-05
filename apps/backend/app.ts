import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import cors from 'cors'
import {
  clerkMiddleware,
  getAuth,
} from '@clerk/express'

import movieRoutes from './routes/movieRoutes'
import allMoviesRoutes from './src/api/v1/routes/allMoviesRoutes'

const app: Express = express()
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        //maybe then *
        callback(null, origin ?? '*');
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    //maybe this
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

//maybe this
app.options('*', cors());


app.use(express.json())

app.use(clerkMiddleware())

// Temporary authentication debugging
app.use(
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const auth = getAuth(req)

    console.log({
      path: req.path,
      hasAuthorizationHeader: Boolean(
        req.headers.authorization
      ),
      userId: auth.userId,
    })

    next()
  }
)

app.get('/', (_req: Request, res: Response) => {
  res.send('Got response from backend!')
})

app.use('/movies', movieRoutes)

app.use('/api/v1', allMoviesRoutes)

export default app