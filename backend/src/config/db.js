const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

async function connectDB(url) {
	try {
		return mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	} catch (error) {
		return error
	}
}

module.exports = { connectDB }
