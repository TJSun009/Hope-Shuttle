import { ListGroup } from "react-bootstrap";
import ScheduleItem, { ScheduleProps } from "./ScheduleItem/ScheduleItem";

interface ScheduleListProps {
	list: Array<ScheduleProps>
}

const ScheduleList = (props: ScheduleListProps) => {
	const { list } = props;

	return (
		<ListGroup variant="flush">
			{
				Object.values(list).map(({ stop, scheduled, expected, active }: ScheduleProps, index: number) =>
					<ListGroup.Item
						key={index}
						className="d-inline-flex justify-content-between align-items-start"
						active={active}>
						<ScheduleItem stop={stop} scheduled={scheduled} expected={expected} active={active}/>
					</ListGroup.Item>
				)
			}
		</ListGroup>
	)
}

export default ScheduleList