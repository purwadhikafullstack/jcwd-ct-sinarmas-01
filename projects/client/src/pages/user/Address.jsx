import Datas from "@/components/Datas";
import useAddresses from "@/hooks/queries/user/useAddresses";
import Loading from "@/components/Loading";
import Error from "../error/Error";
import useAddressMutations from "@/hooks/mutations/user/useAddressMutations";
import Swal from "@/components/Swal";
import Map from "@/components/Map";
import formToObj from "@/libs/formToObj";
import { getId } from "@/api/token";
import toGeoStr from "@/libs/toGeoStr";
import toLatLng from "@/libs/toLatLng";

const center = { lat: -6.3021366, lng: 106.6439783 };
const setCenter = (lat, lng) => {
	center.lat = lat;
	center.lng = lng;
}
const config = {
	title: "Addresses",
	showCancelButton: true,
	cancelButtonText: "No",
	confirmButtonText: "Yes"
};

const Form = () => {
	const onSubmit = (e) => e.preventDefault();
	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="address_name">Address Name</label>
			<input 
				className="swal2-input" 
				name="address_name" 
				id="address_name" 
				placeholder="Enter Address Name"
			/>
			<input type="hidden" name="user_id" value={getId()} readOnly />
			<label>Set your coordinates</label>
			<Map center={center} onChange={setCenter} />
		</form>	
	)
}
export default function Address() {
	const { data, isLoading, isError } = useAddresses();
	const { useAddMutation, useDeleteMutation, useEditMutation } = useAddressMutations();
	const add = useAddMutation();
	const edit = useEditMutation();
	const del = useDeleteMutation();
	const html = <Form />;
	const newFn = () => {
		Swal.fire({
			...config,
			html,
			didOpen: () => {
				Swal.getPopup().querySelector("form").reset();
			},
			preConfirm: () => {
				return new FormData(Swal.getPopup().querySelector("form"));
			},
		}).then (res => {
			const data = res.value;
			data.append("q", toGeoStr(center));
			res.isConfirmed && add.mutate(formToObj(data));
		});
	}
	const editFn = (id) => {
		const geoStr = document.getElementById(`${id}-address.geolocation`).dataset.value;
		const { lat, lng } = toLatLng(geoStr);
		setCenter(lat, lng);
		console.log({ lat, lng });
		Swal.fire({
			...config,
			html,
			didOpen: () => {
				const p = Swal.getPopup();
				const name = document.getElementById(`${id}-address.address_name`).dataset.value;
				p.querySelector("#address_name").value = name;
			},
			preConfirm: () => {
				const form = Swal.getPopup().querySelector("form");
				const data = new FormData(form);
				return data;
			}
		}).then (res => {
			if (res.isConfirmed) {
				const addrId = document.getElementById(`${id}-address.id`).dataset.value;
				const data = res.value;
				data.append("id", addrId);
				data.append("q", toGeoStr(center));
				console.log(formToObj(data));
				edit.mutate(formToObj(res.value))
			}
		});
	}
	const deleteFn = (id) => {
		const delId = document.getElementById(`${id}-address.id`).dataset.value;
		Swal
			.fire({ ...config, text: "Do you want to delete address?", icon: "question" })
			.then(res => res.isConfirmed && del.mutate(delId));
	}
	return (
		<>
			{!isLoading && !isError && (
				<Datas 
					caption="Address"
					data={data.rows} 
					newFn={newFn}
					deleteFn={deleteFn}
					editFn={editFn}
					columns={[
						["address.address_name", "Name"],
						["address.geolocation", "Geo"],
						["address.id", "ID", true]
					]}
				/>
			)}
			{isLoading && <Loading />}
			{isError && <Error />}
		</>
	);
}
