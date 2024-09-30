import app from "./app.js";
import dotenv from 'dotenv'
import ConnectDb from './db/db.js'

dotenv.config({ path: "./.env" })


  
const RunningPORT =process.env.PORT


ConnectDb()
.then(() => {
    app.listen(RunningPORT, () => {
        console.log(`Server is running on port ${RunningPORT}`)
    })
}).catch((error) => {
    console.log(error)
})
