const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;

var location = {"latitude": null, "longitude": null}

app.post("/position-update", (req, res) => {
	let data = req.body;
	console.log(data);
	location = data
	res.status(200).json({ data });
});

app.get("/position-update", (req, res) => {
	res.status(200).json({ location });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = { app };