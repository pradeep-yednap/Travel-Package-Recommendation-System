const http = require("http")
const cors = require("cors")
const dotenv = require("dotenv")
const app = require("./src/config/app")
const { connectDB } = require("./src/config/db")
const { MONGODB_URL, PORT, HOST } = require("./src/constants/env")

// initializing server
const host = HOST
const port = PORT



async function start() {
	const mongoURL = MONGODB_URL

	try {
		///  CONNECTING TO DATABASE  ///
		await connectDB(mongoURL)
		console.log("Connected to database...")
		const server = http.createServer(app)

		// listening for requests
		server.listen({ host, port }, () => {
			console.log(`listening on: http://${host}:${port}`)
		})
	} catch (error) {
		console.log("Error connecting to database!", error)
		return { message: "Error connecting to database!", error }
	}
}

start()
