import { ReactElement, useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import "./Map.css"

interface MapProps {
	apiKey?: string,
	campuses: {[key: string] : google.maps.LatLngLiteral},
	zoom: number
}

const render = (status: Status): ReactElement => {
	if (status === Status.LOADING) return <h3>{status} ..</h3>;
	if (status === Status.FAILURE) return <h3>{status} ...</h3>;
	return <></>;
};

const Map = ({ campuses, zoom }: MapProps) => {

	const ref = useRef(null);

	const bounds = new window.google.maps.LatLngBounds();

	Object.values(campuses).forEach(location => {
		bounds.extend(location);
	});

	useEffect(() => {
		if (ref.current != null) {
			const map = new window.google.maps.Map(ref.current, { center: campuses.hope, zoom });
			map.fitBounds(bounds);
		}
	});

	return <div className="Map" ref={ref} id="map" />;
}

const WrappedMap = ({apiKey, campuses, zoom}: MapProps) => {
	return (
		<Wrapper apiKey={apiKey ? apiKey : ''} render={render}>
			<Map campuses={campuses} zoom={zoom}/>
		</Wrapper>
	)
}

export default WrappedMap;