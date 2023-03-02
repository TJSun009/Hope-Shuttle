function showMap() {

	const bounds = new google.maps.LatLngBounds();

	const campuses = {
		hope: { lat: 53.39291085883611, lng: -2.89255768139488 },
		aigburth: { lat: 53.3757838611232, lng: -2.9505664960754565 },
		creative: { lat: 53.41373524339927, lng: -2.9689603593134772 }
	};

	const map = new google.maps.Map(document.getElementById("map"));

	Object.values(campuses).forEach(location => {
		bounds.extend(location);
	});

	map.fitBounds(bounds);

	window.addEventListener("resize", (e) => {
		map.fitBounds(bounds);
	})

	// permalinks generated using https://kolorobot.github.io/permalink/
	let pre10 = "http://drive.google.com/uc?id=1l8khQ_n7hYOQ1E0n1X2vmOZDqY_OlPRO";

	let post10 = "http://drive.google.com/uc?id=1zmO9uHzXwzih3tY3Q-4T3m3cWF6dBA0B";

	// 11:40
	let date = new Date()
	
	let route = date.getHours() * 60 + date.getMinutes() > 11 * 60 + 40 ? post10 : pre10

	let stops = "http://drive.google.com/uc?id=13mufDPDVuMzxelLwYTyNSBNPUIeSZwRo";

	// const kmlLayer = new google.maps.KmlLayer({ url: src, map: map, });
	const routeLayer = new google.maps.KmlLayer({ url: route, map: map, });

	// const stopsLayer = new google.maps.KmlLayer({ url: stops, map: map, });

	google.maps.event.addListenerOnce(routeLayer, 'status_changed', function() {
		console.log('KML status is', routeLayer.getStatus());
	});
}

// Loading Timetable from File

function getDatesFromPDFText(text, start = "The full service runs on the following dates:", end = "Campus") {

	let start_dates = [];
	let end_dates = [];
	let temp = "";

	let join = false;

	for (let item of text.items) {
		if (item.str == start) {
			join = true
		} else if (item.str == end) {
			break
		} else if (join == true) {
			temp += item.str;

			if (item.str.match(/20\d\d/)) {
				temp += '\n';
			}
		}
	}

	temp = temp.replace(/\n$/, '');

	temp = temp.split('\n').forEach((pair) => {
		let [day1, day2] = pair.match(/\d{1,2}\s?(st|nd|rd|th)/g).map((day) => day.replace(/(st|nd|rd|th)/, '').trim());
		let monthNums = { "January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06", "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12" };
		let year = pair.match(/20\d\d/g)[0];
		let [month1, month2] = pair.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w+/g).map((month) => monthNums[month]);

		start_dates.push(`${year}${month1}${day1}`)
		end_dates.push(`${year}${month2}${day2}`)

	});

	return [start_dates, end_dates];
}

function writeDatesToCalendarTXT(service, start_dates, end_dates) {
	const fs = require('fs')

	// Data which will write in a file.
	let data = "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date";



	// Write data in 'Output.txt' .
	fs.writeFile('calendar2.txt', data, (err) => {

		// In case of a error throw err.
		if (err) throw err;
	})
}

// Reading timetable from pdf and putting into calendar etc 
function loadTimetable() {
	const PDFJS = window['pdfjs-dist/build/pdf'];

	pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

	const doc_url = "./Shuttle_Bus_Timetable_A4_Info_Sheet_170822.pdf";
	let document = PDFJS.getDocument(doc_url);
	let fs_start_dates = [];
	let fs_end_dates = [];

	document.promise.then((pdf) => {
		pdf.getPage(1).then((page) => {
			page.getTextContent().then((text) => {

				fs_start_dates, fs_end_dates = getDatesFromPDFText(text);
				// writeDatesToCalendarTXT(fs_start_dates, fs_end_dates);
			});
		})
	})

}

window.showMap = showMap;
// window.loadTimetable = loadTimetable;