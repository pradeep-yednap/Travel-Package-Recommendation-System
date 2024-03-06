const bcrypt = require("bcrypt")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const { User } = require("../models/user")
const { JWT_SECRET } = require("../constants/env")

// Login Controller
const loginController = async (req, res) => {
	try {
		// Validate request body
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		})
		const { error } = schema.validate(req.body)
		if (error) {
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message })
		}

		// Find user by email
		const user = await User.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" })
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" })
		}

		console.log(JWT_SECRET)
		// Create token
		const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: "1h",
		})

		return res.status(200).json({
			success: true,
			message: "Login successful",
			token,
			user: {
				fullName: user.fullName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				_id: user._id.toString(),
			},
		})
	} catch (error) {
		console.error(error)
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" })
	}
}

// Register Controller
const registerController = async (req, res) => {
	try {
		// Validate request body
		const schema = Joi.object({
			fullName: Joi.string().required(),
			email: Joi.string().email().required(),
			phoneNumber: Joi.string().required(),
			password: Joi.string().required(),
			address: Joi.string().required(),
			confirmPassword: Joi.string()
				.valid(Joi.ref("password"))
				.required()
				.messages({
					"any.only": "Passwords do not match",
				}),
		})
		const { error } = schema.validate(req.body)
		if (error) {
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message })
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email: req.body.email })
		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" })
		}

		// Encrypt password
		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		// Create new user
		const newUser = new User({
			fullName: req.body.fullName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			password: hashedPassword,
			address: req.body.address,
		})

		// Save user to database
		await newUser.save()

		// Return success response
		return res
			.status(201)
			.json({ success: true, message: "Registration successful" })
	} catch (error) {
		// console.error(error)
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" })
	}
}

module.exports = {
	loginController,
	registerController,
}
