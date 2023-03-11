import { ReactElement, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Spinner } from "react-bootstrap";

interface MapProps {
	zoom: number,
	apiKey?: string,
	setUserLocation: (value: google.maps.LatLngLiteral) => void,
	campuses: { [key: string]: google.maps.LatLngLiteral },
}

const render = (status: Status): ReactElement => {
	if (status === Status.LOADING) return <Spinner className={"w-25 h-25"} animation="grow" variant="primary" />;
	if (status === Status.FAILURE) return <h3>{status} ...</h3>;
	return <></>;
};

const Map = ({ campuses, zoom, setUserLocation }: MapProps) => {

	const ref = useRef(null);

	const [marker, setMarker] = useState<google.maps.Marker>();
	const [map, setMap] = useState<google.maps.Map | undefined>(null);

	if (navigator.geolocation) {
		navigator.geolocation.watchPosition((pos) => {
			setMarker(new google.maps.Marker({
				position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
				title: "You",
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 3,
					strokeColor: "purple",
					strokeWeight: 8,
					strokeOpacity: 0.75,
				}
			}));
			setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
		})
	} else {
		console.log("Geolocation not supported...")
	}

	const bounds = new window.google.maps.LatLngBounds();

	Object.values(campuses).forEach(location => {
		bounds.extend(location);
	});

	useEffect(() => {
		if (ref.current != null) {
			const map = new window.google.maps.Map(ref.current, { center: campuses.hope, zoom });
			map.fitBounds(bounds);
			setMap(map);
		}
	}, []);

	useEffect(() => {
		if (ref.current != null) {
			marker?.setMap(null);
			marker?.setMap(map);
		}
	}, [marker])

	return <div className={"h-100 w-100"} ref={ref} id="map" />;
}

const WrappedMap = ({ apiKey, campuses, zoom, setUserLocation }: MapProps) => {
	return (
		<Wrapper apiKey={apiKey ? apiKey : ''} render={render}>
			<Map campuses={campuses} zoom={zoom} setUserLocation={setUserLocation} />
		</Wrapper>
	)
}

export default WrappedMap;