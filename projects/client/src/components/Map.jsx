import {
	TileLayer,
	Marker,
	Popup,
	MapContainer,
	useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * @param {{onChange?: Function | null}} props
 * */
function LocationMarker(props) {
	const [position, setPosition] = useState(props.position);
	const [name, setName] = useState("");
	const { onChange } = props;
	const map = useMapEvents({
		click(e) {
			setPosition(e.latlng);
			(onChange)(e.latlng);
			console.log(e.latlng);
		},
	});
	useEffect(() => {
		setTimeout(() => {
			map.invalidateSize();
		}, 0);
		map.flyTo(props.position, map.getZoom());
	}, []);
	return position === null ? null : (
		<Marker position={position}>
			<Popup>{name}</Popup>
		</Marker>
	);
}

/**
 * @param {{ onChange?: Function | null, center: { lat: number, lng: number } }} props
 * */
export default function Map(props) {
	const { onChange, center } = props;
	return (
		<MapContainer
			center={center}
			zoom={15}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker onChange={onChange} position={center} />
		</MapContainer>
	);
}
