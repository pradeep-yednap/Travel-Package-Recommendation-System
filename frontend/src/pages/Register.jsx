import React, { useState } from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Register = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { name, address, phoneNumber, email, password, confirmPassword } =
			e.target.elements

		const newUser = {
			fullName: name.value,
			address: address.value,
			phoneNumber: phoneNumber.value,
			email: email.value,
			password: password.value,
			confirmPassword: confirmPassword.value,
		}

		if (Object.values(newUser).some((el) => el === "")) {
			setError("Please fill all fields")
			return
		}

		try {
			setLoading(true)

			const res = await fetch("http://localhost:5000/api/v1/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			})
			const data = await res.json()

			if (data.success) {
				history("/login")
				toast.success(data?.message)
			} else {
				toast.error(data?.message)
				setError(data?.message)
			}
			setLoading(false)
		} catch (err) {
			console.log(err)
			setError(err.message)
			toast.error(err.message)
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className=" mb-4 text-2xl text-center">Join With Us!</h1>
			<Form onSubmit={handleSubmit} className="w-full max-w-sm">
				<FormGroup>
					<Label for="name">Name</Label>
					<Input type="text" name="name" id="name" required />
				</FormGroup>
				<FormGroup>
					<Label for="address">Address</Label>
					<Input type="text" name="address" id="address" required />
				</FormGroup>
				<FormGroup>
					<Label for="phoneNumber">Phone Number</Label>
					<Input type="tel" name="phoneNumber" id="phoneNumber" required />
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input type="email" name="email" id="email" required />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type={showPassword ? "text" : "password"}
						name="password"
						id="password"
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label for="confirmPassword">Confirm Password</Label>
					<Input
						type={showPassword ? "text" : "password"}
						name="confirmPassword"
						id="confirmPassword"
						required
					/>
				</FormGroup>
				<Button
					type="button"
					color="link"
					className="password-toggle"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? "Hide Password" : "Show Password"}
				</Button>

				{/* {error && <p className="text-red-500">{error}</p>} */}
				<Button
					type="submit"
					style={{ backgroundColor: "#369445" }}
					className=" custom-button w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
				>
					{loading ? "Registering..." : "Register"}
				</Button>
			</Form>
		</div>
	)
}

export default Register
