import express  from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
dotenv.config()
const port =  process.env.PORT;
import todoRoutes from './routes/todoRoutes.js'
connectDB()
const app = express()
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'], 
    optionsSuccessStatus: 204, 
  };
  
  app.use(cors(corsOptions));


app.use('/api', todoRoutes )

app.listen(port, console.log(`Server running on port ${port}`))





