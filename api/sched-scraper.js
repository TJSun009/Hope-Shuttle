const axios = require(axios)

const table_query = ".page_body table"
const date_query = ".page_body ul"

// use ETag to check if page needs updating

const cache_schedule = () => {
	const sched_dates = {}
	
	const tables = document.querySelector(table_query);
	const date_lists = document.querySelector(date_query);

	tables.forEach((node, idx) => {
		var date_list = date_lists[idx];
		var regex = / ([A-Za-z]+) service runs/
		var sched_type = (dates.previousSibling.innerText).match(regex)[1]

		// check this function
		// load in stops to file as well
		date_list.forEach((node) => {
			var date_string = node.innerText
			sched_dates[sched_type] = date_parser(date_string)
		})

		
		// save schedule to file after processing
		
	})
	
}

const date_parser = (dates) => {
	// match groups: date, date, year
	// const dates = "19 December 2022 - 6 January 2023";
	const regex = /(\d{1,2} [A-Za-z]+).+(\d{1,2} [A-Za-z]+) (\d{4})/;
	
	const match = input.match(regex);
	const [start, end, year] = match.slice(1);

	return [
		Date.parse(`${start} ${year}`), 
		Date.parse(`${end} ${year}`)
	]
}



// pick up all tables
document.querySelectorAll("table")

// pick up all rows

// styles of titles
