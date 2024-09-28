import app from "./app.js";
import dotenv from 'dotenv'
import ConnectDb from './db/db.js'

dotenv.config({ path: "../.env" })


  
const PORT =import.meta.env.PORT


ConnectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})
