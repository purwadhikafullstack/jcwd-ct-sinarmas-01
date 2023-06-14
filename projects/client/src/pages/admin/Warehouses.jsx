import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getWarehouses from "@/apis/getWarehouses";
import newWarehouse from "@/apis/newWarehouse";
import Datas from "@/components/Datas";
import { useState } from "react";
import Swal from "@/components/Swal";
import getAddresses from "@/apis/getAddresses";
import editWarehouse from "@/apis/editWarehouse";
import deleteWarehouse from "@/apis/deleteWarehouse";
import { QueryClient } from "@tanstack/react-query";
import Map from "@/components/Map";

export default function ManageWareHouses() {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(0);
  const [mapPos, setMapPos] = useState([0, 0]);
  const query = useQuery({
    queryFn: async () => await getWarehouses(page),
    queryKey: ["warehouses", page],
  });
  const client = useQueryClient();
  const onMutated = (data) => {
    client.invalidateQueries({ queryKey: ["warehouses"] });
    Swal.fire({ text: data.message, icon: "success" });
  }
  const newMutation = useMutation({
    mutationFn: async (data) => await newWarehouse(data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["warehouses"] });
      Swal.fire({ text: data.message, icon: "success" });
    },
  });
  const addresses = useQuery({
    queryFn: async () => await getAddresses(),
    queryKey: ["addresses"],
  });
  const WarehouseForm = (props) => {
    return (
      <form id={props.id ? "edit-form" : "new-form"} onSubmit={(e) => e.preventDefault()}>
        <input name="warehouse_name" className="swal2-input" placeholder="Enter Warehouse Name" defaultValue={props.default} />
        <select name="address_id" className="swal2-select">
          {addresses.data?.rows.map((val, key) => (
            <option value={val.id} key={key}>{val.address_name}</option>
          ))}
        </select>
        <Map onChange={setMapPos} />
      </form>
    )
  };
  const editMutation = useMutation({
    mutationFn: async (data) => await editWarehouse(editId, data),
    onSuccess: onMutated
  });
  const delMutation = useMutation({
    mutationFn: async (data) => await deleteWarehouse(data),
    onSuccess: onMutated
  })

  const newFn = () => {
    Swal.fire({
      title: "New Warehouse",
      html: <WarehouseForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      }
    }).then (result => {
      const form = new FormData(result.value);
      form.append("geo", mapPos);
      result.isConfirmed && newMutation.mutate(form);
    });
  };

  const editFn = (id) => {
    setEditId(id);
    Swal.fire({
      title: `Edit Warehouse #${id}`,
      html: <WarehouseForm id={id} />,
      didOpen: () => {
        const popup = Swal.getPopup();
        let name = document.getElementById(`${id}-warehouse_name`).textContent;
        let address = document.getElementById(`${id}-address.id`).textContent;
        popup.querySelector("[name=\"warehouse_name\"]").value = name;
        popup.querySelector("[name=\"address_id\"]").value = address;
      },
      preConfirm: () => {
        return Swal.getPopup().querySelector("#edit-form");
      }
    }).then (result => {
      const form = new FormData(result.value);
      form.append("geo", mapPos);
      result.isConfirmed && editMutation.mutate(form);
    });
  };

  const deleteFn = (id) => {
    Swal.fire({
      text: "Delete this warehouse?",
      icon: "question",
      showCancelButton: true
    }).then(res => res.isConfirmed && delMutation.mutate(id))
  }

  return (
    <>
      <Datas
        columns={[
          ["id", "warehouse id"],
          ["warehouse_name", "warehouse name"],
          ["address.address_name", "address"],
          ["address.id", "address_id"],
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
