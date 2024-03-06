const dotenv = require("dotenv")

dotenv.config({ path: "./.env" })

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"
const HOST = process.env.HOST || "localhost"
const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URL = process.env.MONGODB_URL
const NODE_ENV = process.env.NODE_ENV || "development"
const PORT = process.env.PORT || 5000

module.exports = {
	CLIENT_URL,
	HOST,
	JWT_SECRET,
	MONGODB_URL,
	NODE_ENV,
	PORT,
}
