import Datas from "@/components/Datas";
import Swal from "@/components/Swal";
import Map from "@/components/Map";
import toLatLng from "@/libs/toLatLng";
import formToObj from "@/libs/formToObj";
import useWarehouseQuery from "@/hooks/queries/common/useWarehouseQuery";
import useWarehouseMutations from "@/hooks/mutations/super/useWarehouseMutations";

export default function ManageWareHouses() {
  const defaultPos = { lat: -6.3021366, lng: 106.6439783 };
  const mapPos = {...defaultPos};
  const setMapPos = (lat, lng) => {
    mapPos.lat = lat;
    mapPos.lng = lng;
  }
  const query = useWarehouseQuery();
  const { useAddMutation, useEditMutation, useDeleteMutation } = useWarehouseMutations();
  const add = useAddMutation();
  const edit = useEditMutation();
  const del = useDeleteMutation();
  const WarehouseForm = (props) => (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        name="warehouse_name"
        className="swal2-input"
        placeholder="Enter Warehouse Name"
        defaultValue={props.default}
      />
      <Map onChange={setMapPos} center={mapPos} />
    </form>
  );

  const newFn = () => {
    setMapPos(defaultPos.lat, defaultPos.lng);
    console.log(mapPos);
    Swal.fire({
      title: "New Warehouse",
      html: <WarehouseForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      },
      showCancelButton: true,
    }).then((result) => {
      const form = new FormData(result.value);
      form.append("q", `${mapPos.lat}, ${mapPos.lng}`);
      !result.isConfirmed ? setMapPos(defaultPos.lat, defaultPos.lng) : add.mutate(formToObj(form));
    });
  };

  const editFn = (id) => {
    Swal.fire({
      title: `Edit Warehouse #${id}`,
      html: <WarehouseForm id={id} />,
      didOpen: () => {
        const geo = document.getElementById(
          `${id}-address.geolocation`
        ).textContent;
        const latlng = toLatLng(geo);
        setMapPos(latlng.lat, latlng.lng);
        const popup = Swal.getPopup();
        const name = document.getElementById(`${id}-warehouse_name`).dataset.value;
        popup.querySelector('[name="warehouse_name"]').value = name;
      },
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      },
      showCancelButton: true,
    }).then((result) => {
      const form = new FormData(result.value);
      const addressId = document.getElementById(`${id}-address.id`).dataset.value;
      form.append("q", `${mapPos.lat}, ${mapPos.lng}`);
      form.append("address_id", addressId);
      form.append("id", id);
      !result.isConfirmed ? setMapPos(defaultPos.lat, defaultPos.lng) : edit.mutate(formToObj(form));
    });
  };

  const deleteFn = (id) => {
    Swal.fire({
      text: "Delete this warehouse?",
      icon: "question",
      showCancelButton: true,
    }).then((res) => res.isConfirmed && del.mutate(id));
  };

  return (
    <>
      <Datas
        columns={[
          ["id", "warehouse id", true],
          ["warehouse_name", "warehouse name"],
          ["address.address_name", "address"],
          ["address.geolocation", "Geo"],
          ["address.id", "Address ID", true],
          ["user.username", "Admin"],
        ]}
        data={query.data?.rows}
        editFn={editFn}
        deleteFn={deleteFn}
        newFn={newFn}
        caption="Warehouse"
      />
    </>
  );
}
