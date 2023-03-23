import './App.css';

import axios from "axios"
import { useState, useEffect} from "react";
import { useInterval } from 'usehooks-ts'

import CONSTANTS from "./CONSTANTS";
import Map from './components/Map/Map';
import ScheduleList from './components/ScheduleList/ScheduleList';

import { Container, Row, Col, Navbar, Card } from 'react-bootstrap';

const apiKey = "AIzaSyDzolQZChZcvGbD1cl2rdm1lll0v_QBcL4";
// console.log(apiKey, process.env['MAPS_API_KEY']);

const getClosestStop = ({ lat, lng }: google.maps.LatLngLiteral) => {

	let stop: string = "";
	let min_distance: number = Infinity;

	Object.keys(CONSTANTS.stops).forEach((k: string) => {
		const { lat: lat1, lng: lng1 } = CONSTANTS.stops[k];
		const distance = Math.sqrt(Math.pow(Math.abs(lat - lat1), 2) + Math.pow(Math.abs(lng - lng1), 2));

		if (distance < min_distance) {
			stop = k;
			min_distance = distance;
		}
	})

	return stop;
}

const getRecentPickups = (stop: string) => {

	const pickups = [];
	const dateTime = new Date(Date.now());

	if (CONSTANTS.days.includes(dateTime.getDay()) == true) {
		console.log(dateTime.toLocaleTimeString());
	}

	return pickups;
}

const pollBusLocation = () => axios.get("/position-update")

const App = () => {

	const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>();
	const [busLocation, setBusLocation] = useState<google.maps.LatLngLiteral>();

	const list = [
		{ "stop": "Aigburth", "scheduled": new Date("2022-01-01T08:15:00.000Z"), "expected": new Date("2022-01-01T08:10:00.000Z") },
		{ "stop": "Hope", "scheduled": new Date("2022-01-01T10:15:00.000Z"), "expected": new Date("2022-01-01T10:17:00.000Z"), active: true },
		{ "stop": "Aigburth", "scheduled": new Date("2022-01-01T13:15:00.000Z"), "expected": new Date("2022-01-01T13:10:00.000Z") }
	]

	useInterval(() => {
		axios.get("/position-update")
		.then(({data}: any) => {
			const {location} = data
			setBusLocation({"lat": location.latitude, "lng": location.longitude})
		})
	}, 2000)

	useEffect(() => {
		console.log(userLocation);
		if (userLocation) {
			console.log(getClosestStop(userLocation));
		}
	}, [userLocation])

	const options = {setUserLocation, busLocation}

	return (
		<div >
			<Navbar bg="danger" variant="dark">
				<Container>
					<Navbar.Brand href="#home">
						<img
							src="/logo192.png"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Hope Shuttle Bus"
						/>
						{' '}
						Hope Shuttle Bus
					</Navbar.Brand>
				</Container>
			</Navbar>
			<br />
			<Container className={"vh-100"} as="div" fluid>
				<Row className={"m-auto flex-grow-1"}>
					<Col sm>
						<Card>
							<Card.Header className={"text-center"} as={"h3"}>Upcoming Pickups</Card.Header>
							<ScheduleList list={list} />
						</Card>
					</Col>
					<Col sm>
						<Map apiKey={apiKey} campuses={CONSTANTS.campuses} zoom={4} options={options} />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
