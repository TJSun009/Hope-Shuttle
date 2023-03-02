const express = require("express");
const path = require("path");
const app = express();

const https = require('https');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const PORT = 3000;

const fs = require("fs");

// const gtfstoHtml = import("./public/gtfs-to-html.mjs");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static(path.join(__dirname, "/html")));

const getGTFSFeed = () => {

	const opts = {
		headers: {
        "Content-Type": "application/octet-stream"
    },
		encoding: null
	}

	https.get("https://busalerts.tjsun009.repl.co", opts, (response) => {
		
		console.log("Getting feed message...");
		// error handling from https://github.com/MobilityData/gtfs-realtime-bindings/
		if (response.statusCode != 200) {
			const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
			error.response = response;
			console.error(error);
		} else {

			// response.setEncoding('utf8');

			const chunks = []

			response.on("data", (chunk) => {
				chunks.push(chunk);
			});

			response.on("end", () => {
				console.log("Got feed...");
				const buffer = Buffer.concat(chunks);
				// console.log(buffer.toString('hex').match(/../g).join(' '))
				// console.log(buffer.toString('hex'))
				try{
					const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
						new Uint8Array(buffer)
					);
				} catch (e) {
					console.error(e);
				}
				
			});

			response.on("error", (err) => {
				console.error(err);
			});
		}
	});
}

// app.get("/", () => {
// });


app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
	getGTFSFeed();
})