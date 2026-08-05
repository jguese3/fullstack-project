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
const test = process.env.FRONTEND_URL
const app: Express = express()

app.use(
  cors(
    
    {
    origin: function(origin, callback) {
      const allowedOrigins = ['http://localhost:5173',
                              'http://127.0.0.1:5173',
                              process.env.FRONTEND_URL,]
      
        //If the origin is in the allowedOrigins array 
        // or if there is no origin (for server-to-server requests),
        // allow the request
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  }


)
)

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