const { spawn } = require("child_process")

const aiController = async (req, res) => {
  const { duration, price } = req.body

  // Spawn the Python process
  const pythonProcess = spawn("python3", ["script/ai.py", duration, price])

  pythonProcess.stdout.on("data", (data) => {
    // Capture the output from the Python script
    res.json(JSON.parse(data.toString()))
  })

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data.toString()}`)
  })

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`)
      res.status(500).send("Internal Server Error")
    }
  })
}

module.exports = { aiController }
