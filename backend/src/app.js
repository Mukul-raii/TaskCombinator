import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import bodyparser from 'body-parser'
import userRoute from './routes/user.route.js'
import teamRoute from './routes/team.route.js'
import taskRoute from './routes/task.route.js'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: ["https://taskcombinator.vercel.app","http://localhost:5173"],
        credentials: true
    }
))


app.use("/api/v1/user",userRoute)
app.use("/api/v1/team",teamRoute)
app.use("/api/v1/task",taskRoute)

app.get('/', (_req, res) => {
   res.send("hello from server")
    
});



export default app;