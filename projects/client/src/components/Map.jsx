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
 * @param {{ onChange?: Function | null, position: {lat: number, lng:number} }} props
 * */
function LocationMarker(props) {
	const [pos, setPos] = useState(null);
	const { onChange, position } = props;
	const map = useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			(onChange)(lat, lng);
			setPos(e.latlng);
			console.log(e.latlng);
		},
		load() {
			map.locate();
		},
		locationfound(e) {
			setPos(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		}
	});
	useEffect(() => {
		setTimeout(() => {
			map.invalidateSize();
		}, 0);
		map.flyTo(position, map.getZoom());
		setPos(map.getCenter());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		console.log(`Lat: ${pos?.lat}, Lng: ${pos?.lng}`);
	}, [pos]);
	return pos === null ? null : (
		<Marker position={pos}>
			<Popup>Lokasi Anda</Popup>
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
