import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json());
app.use(cors())
app.use(todoRoutes)

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017/todo"

const options : any = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {

    throw error
  })
