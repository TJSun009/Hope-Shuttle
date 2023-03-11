const campuses: { [key: string]: google.maps.LatLngLiteral } = {
	hope: { lat: 53.39291085883611, lng: -2.89255768139488 },
	aigburth: { lat: 53.3757838611232, lng: -2.9505664960754565 },
	creative: { lat: 53.41373524339927, lng: -2.9689603593134772 }
};

const stops: { [key: string]: google.maps.LatLngLiteral } = {
	"Hope": { lat: 53.39185089795127, lng: -2.8928379823194343 },
	"Creative": { lat: 53.412868542190125, lng: -2.9682941861463443 },
	"Aigburth o/s Tesco": { lat: 53.37844021596063, lng: -2.947919473844631 },
	"Hope Security Lodge": { lat: 53.391526197004566, lng: -2.8931973983263943 },
	"Aigburth o/s Churrasco": { lat: 53.37875972240432, lng: -2.9479011352232893 },
}

interface Schedule {
	[key: string]: Array<string>
}

const fullSchedule: Schedule = {
	"Hope": ["10:35", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10"],
	"Creative": ["07:55", "08:55", "09:55", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45"],
	"Aigburth o/s Tesco": ["11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20"],
	"Hope Security Lodge": ["08:35", "09:35"],
	"Aigburth o/s Churrasco": ["08:15", "09:15", "10:15"],
}

const limSchedule: Schedule = {
	"Hope": ["8:35", "13:05", "18:05", "12:10", "13:10", "17:10", "18:10"],
	"Creative": ["07:55", "08:55", "12:45", "17:45", "12:40"],
	"Aigburth o/s Tesco": ["12:20", "13:20", "17:20", "18:20"],
	"Aigburth o/s Churrasco": ["08:15", "09:15"],
}



// will be necessary for sorting values when not manual
const timeSort = (a: string, b: string) => {
	const [hours_a, mins_a] = a.split(':').map((v: string) => parseInt(v));
	const [hours_b, mins_b] = b.split(':').map((v: string) => parseInt(v));

	if (hours_a > hours_b) {
		return 1;
	} else if (hours_a == hours_b) {
		return mins_a > mins_b ? 1 : -1;
	} else {
		return -1;
	}
}

Object.keys(fullSchedule).forEach((k: string) => {
	fullSchedule[k] = fullSchedule[k].sort(timeSort);
});

Object.keys(limSchedule).forEach((k: string) => {
	limSchedule[k] = limSchedule[k].sort(timeSort);
});

const CONSTANTS = {
	campuses: campuses,
	stops: stops,
	schedules: { full: fullSchedule, lim: limSchedule },
	days: [1, 2, 3, 4, 5],
}

export default CONSTANTS