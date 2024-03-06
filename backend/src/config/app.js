const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const xss = require("xss-clean")
const helmet = require("helmet")
const { NODE_ENV } = require("../constants/env")
const app = express()

const corsOptions = {
  origin: true,
  credentials: true,
};


// finding node environment
require("dotenv").config({ path: "./.env" }) // The path is relative to the root of the project

// setup middlewares
app.set("view engine", "ejs")
app.use(xss())
app.use(helmet())
app.use(cors(corsOptions))

// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	)
// 	next()
// })

// app.use(cors())

app.use(express.json({ limit: "50mb" }))
NODE_ENV === "development" && app.use(morgan("dev"))

app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use("/api", require("../routes"))

// routes
app.get("/", (req, res) => {
	res.status(404).json({ message: "You're in development mode..." })
})

app.get("*", (req, res) => {
	res.status(404).json({ message: "404" })
})

// logging for development mode
if (NODE_ENV == "development") {
	console.log("(development mode)\nMorgan is running...")
}

module.exports = app
