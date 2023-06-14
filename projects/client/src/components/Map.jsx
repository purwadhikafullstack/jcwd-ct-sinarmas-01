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
import searchLocation from "@/apis/searchLocation";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * @param {{onChange?: Function | null}} props
 * */
function LocationMarker(props) {
	const [position, setPosition] = useState(null);
	const [name, setName] = useState("");
	const { onChange } = props;
	const map = useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			(onChange)([lat, lng]);
			map.setView(e.latlng, map.getZoom());
		},
		locationfound(e) {
			map.flyTo(e.latlng, map.getZoom());
			setPosition(e.latlng);
		}
	});
	useEffect(() => {
		setTimeout(() => {
			map.invalidateSize();
		}, 100);
		map.locate();
	}, []);
	return position === null ? null : (
		<Marker position={position}>
			<Popup>{name}</Popup>
		</Marker>
	);
}

/**
 * @param {{onChange?: Function | null}} props
 * */
export default function Map(props) {
	const { onChange } = props;
	return (
		<MapContainer
			center={{ lat: -6.1761924, lng: 106.6382161 }}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker onChange={onChange} />
		</MapContainer>
	);
}
