import { Badge, Container, Row, Col } from "react-bootstrap";

export interface ScheduleProps {
	stop: string,
	scheduled: Date,
	expected: Date,
	active?: boolean
}

const ScheduleItem = (props: ScheduleProps) => {
	const { stop, scheduled, expected, active } = props;

	let delay = (expected.valueOf() - scheduled.valueOf()) / (1000 * 60);
	const delayed = delay > 0 ? "danger" : "success";

	return (
		<Container>
			<Row className={"align-items-center"}>
				<Col as={"h4"}>{stop}</Col>
				<Col xs={3}>
					<Row as={"p"}>Expected</Row>
					<Row className={active ? "text-primary" : ''} as={"h1"}>{expected.toLocaleTimeString().slice(0, -3)}</Row>
				</Col>
				<Col>
					<Badge bg={delayed}>{delay > 0 ? '+' + delay : '' + delay} mins delayed</Badge>
				</Col>
			</Row>
		</Container>

	)
}

export default ScheduleItem