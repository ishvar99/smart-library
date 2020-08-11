require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
require("colors")
const app = express()
const path = require("path")
app.use("/resources", express.static(path.join(__dirname, "../public/uploads")))
const PORT = process.env.PORT

const morgan = require("morgan")
const errorHandler = require("../middlewares/error")
const authRoutes = require("../routes/auth")
const userRoutes = require("../routes/user")
const genreRoutes = require("../routes/genre")
const bookRoutes = require("../routes/book")
const authorRoutes = require("../routes/author")
const planRoutes = require("../routes/plan")
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"))
}
const connectDB = require("../database/db")
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1", genreRoutes)
app.use("/api/v1", bookRoutes)
app.use("/api/v1", authorRoutes)
app.use("/api/v1", planRoutes)

app.use(errorHandler)
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.bold
  )
})
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red)
  //close and exit server
  server.close(() => process.exit(1))
})
