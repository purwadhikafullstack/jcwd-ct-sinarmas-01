import Datas from "@/components/Datas";
import Swal from "@/components/Swal";
import Map from "@/components/Map";
import toLatLng from "@/libs/toLatLng";
import formToObj from "@/libs/formToObj";
import useWarehouseQuery from "@/hooks/queries/common/useWarehouseQuery";
import useWarehouseMutations from "@/hooks/mutations/super/useWarehouseMutations";

export default function ManageWareHouses() {
  const defaultPos = { lat: -6.3021366, lng: 106.6439783 };
  const center = {...defaultPos};
  const setCenter = (lat, lng) => {
    center.lat = lat;
    center.lng = lng;
  }
  const query = useWarehouseQuery();
  const { useAddMutation, useEditMutation, useDeleteMutation } = useWarehouseMutations();
  const add = useAddMutation();
  const edit = useEditMutation();
  const del = useDeleteMutation();
  const WarehouseForm = (props) => {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="warehouse_name">Warehouse Name</label>
        <input
          name="warehouse_name"
          id="warehouse_name"
          className="swal2-input"
          placeholder="Enter Warehouse Name"
          defaultValue={props.default}
        />
        <label>Warehouse Location : </label>
        <Map onChange={setCenter} center={center} />
        <label htmlFor="username" className="mt-3">Warehouse Admin Username : </label>
        <input
          name="username"
          id="username"
          className="swal2-input"
          placeholder="Enter Admin Username"
        />
      </form>
    )
  };

  const newFn = () => {
    setCenter(defaultPos.lat, defaultPos.lng);
    Swal.fire({
      title: "New Warehouse",
      html: <WarehouseForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      },
      showCancelButton: true,
    }).then((result) => {
      const form = new FormData(result.value);
      form.append("q", `${center.lat}, ${center.lng}`);
      !result.isConfirmed ? setCenter(defaultPos.lat, defaultPos.lng) : add.mutate(formToObj(form));
    });
  };

  const editFn = (id) => {
    const geoStr = document.getElementById(`${id}-address.geolocation`).dataset.value;
    const { lat, lng } = toLatLng(geoStr);
    setCenter(lat, lng);
    Swal.fire({
      title: `Edit Warehouse #${id}`,
      html: <WarehouseForm id={id} />,
      didOpen: () => {
        const p = Swal.getPopup();
        const name = document.getElementById(`${id}-warehouse_name`).dataset.value;
        const admin = document.getElementById(`${id}-user.username`).dataset.value;
        p.querySelector('[name="warehouse_name"]').value = name;
        p.querySelector("[name='username']").value = admin;
      },
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      },
      showCancelButton: true,
    }).then((result) => {
      const form = new FormData(result.value);
      const addressId = document.getElementById(`${id}-address.id`).dataset.value;
      form.append("q", `${center.lat}, ${center.lng}`);
      form.append("address_id", addressId);
      form.append("id", id);
      console.log(formToObj(form));
      !result.isConfirmed ? setCenter(defaultPos.lat, defaultPos.lng) : edit.mutate(formToObj(form));
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
        keys="warehouses"
      />
    </>
  );
}
