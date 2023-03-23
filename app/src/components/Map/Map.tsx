import { ReactElement, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Spinner } from "react-bootstrap";

interface MapOptions {
	setUserLocation: (value: google.maps.LatLngLiteral) => void,
	busLocation: google.maps.LatLngLiteral,
}

interface MapProps {
	zoom: number,
	apiKey?: string,
	campuses: { [key: string]: google.maps.LatLngLiteral },
	options: MapOptions
}

const render = (status: Status): ReactElement => {
	if (status === Status.LOADING) return <Spinner className={"w-25 h-25"} animation="grow" variant="primary" />;
	if (status === Status.FAILURE) return <h3>{status} ...</h3>;
	return <></>;
};

const Map = ({ campuses, zoom, options }: MapProps) => {

	const { setUserLocation, busLocation } = options;
	
	const ref = useRef(null);

	const [userMarker, setUserMarker] = useState<google.maps.Marker>();
	const [busMarker, setBusMarker] = useState<google.maps.Marker>();
	
	const [map, setMap] = useState<google.maps.Map | null >(null);

	if (navigator.geolocation) {
		navigator.geolocation.watchPosition((pos) => {
			setUserMarker(new google.maps.Marker({
				position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
				title: "You",
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 3,
					strokeColor: "blue",
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
			userMarker?.setMap(null);
			userMarker?.setMap(map);
		}
	}, [userMarker])
	
	useEffect(() => {
		if (ref.current != null) {
			if (busLocation){
				busMarker?.setMap(null);

				setBusMarker(null);
				
				setBusMarker(new google.maps.Marker({
					position: busLocation,
					title: "Bus",
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 1,
						strokeColor: "red",
						strokeWeight: 8,
						strokeOpacity: 0.75,
					}
				}));
				
				busMarker?.setMap(map);
			}
		}
	}, [busLocation])

	return <div className={"h-100 w-100"} ref={ref} id="map" />;
}

const WrappedMap = ({ apiKey, campuses, zoom, options }: MapProps) => {
	return (
		<Wrapper apiKey={apiKey ? apiKey : ''} render={render}>
			<Map campuses={campuses} zoom={zoom} options={options} />
		</Wrapper>
	)
}

export default WrappedMap;