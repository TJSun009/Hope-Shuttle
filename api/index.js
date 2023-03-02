const express = require("express");
const path = require("path");
const app = express();

const https = require('https');

const PORT = 3000;

app.post("/position-update", (req, res) => {
	let data = req.body;
	console.log(data);
	res.json({ data: data });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
	getGTFSFeed();
})