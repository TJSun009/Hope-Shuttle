const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3001;

app.post("/position-update", (req, res) => {
	let data = req.body;
	console.log(data);
	res.json({ data: data });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
})