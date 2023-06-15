import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getWarehouses from "@/apis/getWarehouses";
import newWarehouse from "@/apis/newWarehouse";
import Datas from "@/components/Datas";
import { useEffect, useState } from "react";
import Swal from "@/components/Swal";
import editWarehouse from "@/apis/editWarehouse";
import deleteWarehouse from "@/apis/deleteWarehouse";
import Map from "@/components/Map";
import toLatLng from "@/libs/toLatLng";

export default function ManageWareHouses() {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(0);
  const defaultPos = { lat: -6.3021366, lng: 106.6439783 };
  const mapPos = defaultPos;
  const setMapPos = (lat, lng) => {
    mapPos.lat = lat;
    mapPos.lng = lng;
  }
  const query = useQuery({
    queryFn: async () => await getWarehouses(page),
    queryKey: ["warehouses", page],
  });
  const client = useQueryClient();
  const onMutated = (data) => {
    client.invalidateQueries({ queryKey: ["warehouses"] });
    Swal.fire({ text: data.message, icon: "success" });
  };
  const newMutation = useMutation({
    mutationFn: async (data) => await newWarehouse(data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["warehouses"] });
      Swal.fire({ text: data.message, icon: "success" });
    },
  });
  const WarehouseForm = (props) => {
    return (
      <form
        id={props.id ? "edit-form" : "new-form"}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          name="warehouse_name"
          className="swal2-input"
          placeholder="Enter Warehouse Name"
          defaultValue={props.default}
        />
        <Map onChange={setMapPos} center={mapPos} />
      </form>
    );
  };
  const editMutation = useMutation({
    mutationFn: async (data) => await editWarehouse(editId, data),
    onSuccess: onMutated,
  });
  const delMutation = useMutation({
    mutationFn: async (data) => await deleteWarehouse(data),
    onSuccess: onMutated,
  });

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
      form.append("geo", `${mapPos.lat}, ${mapPos.lng}`);
      !result.isConfirmed ? setMapPos(defaultPos.lat, defaultPos.lng) : newMutation.mutate(form);
    });
  };

  const editFn = (id) => {
    setEditId(id);
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
        const name = document.getElementById(
          `${id}-warehouse_name`
        ).textContent;
        popup.querySelector('[name="warehouse_name"]').value = name;
      },
      preConfirm: () => {
        return Swal.getPopup().querySelector("#edit-form");
      },
      showCancelButton: true,
    }).then((result) => {
      const form = new FormData(result.value);
      const addressId = document.getElementById(`${id}-address.id`).textContent;
      form.append("geo", `${mapPos.lat}, ${mapPos.lng}`);
      form.append("address_id", addressId);
      !result.isConfirmed ? setMapPos(defaultPos.lat, defaultPos.lng) : editMutation.mutate(form);
    });
  };

  const deleteFn = (id) => {
    Swal.fire({
      text: "Delete this warehouse?",
      icon: "question",
      showCancelButton: true,
    }).then((res) => res.isConfirmed && delMutation.mutate(id));
  };

  return (
    <>
      <Datas
        columns={[
          ["id", "warehouse id"],
          ["warehouse_name", "warehouse name"],
          ["address.address_name", "address"],
          ["address.geolocation", "Geo"],
          ["address.id", "Address ID"],
          ["user.username", "username"],
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
