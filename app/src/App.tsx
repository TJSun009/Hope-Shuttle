import './App.css';
import CONSTANTS from "./CONSTANTS";

import Map from './components/Map/Map'

import {Container, Row, Col} from 'react-bootstrap';

const apiKey = "AIzaSyDzolQZChZcvGbD1cl2rdm1lll0v_QBcL4";
// console.log(apiKey, process.env['MAPS_API_KEY']);

// const Layout = 

const App = () => {
	return (
		<Container>
			<Row>
				<Col>Hello World</Col>
				<Col>
					<Map apiKey={apiKey} campuses={CONSTANTS.campuses} zoom={4}/>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
