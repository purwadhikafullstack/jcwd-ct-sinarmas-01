import { Button, Select } from "react-daisyui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers from "../../apis/getUsers";
import { useState } from "react";
import Swal from "@/components/Swal";
import Datas from "@/components/Datas";
import deleteUser from "@/apis/deleteUser";
import newAdmin from "@/apis/newAdmin";
import editUser from "@/apis/editUser";

export default function ManageUser() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [editId, setEditId] = useState(0);

  const client = useQueryClient();
  const onMutate = () => client.invalidateQueries({ queryKey: ["users"] });
  const users = useQuery({
    queryFn: async () => await getUsers(page),
    queryKey: ["users", page],
    onSuccess: (data) => {
      const arr = [];
      const count = Math.ceil(data?.count / 5);
      for(let i = 1; i <= count; i++) {
        arr.push(i);
        setPages(arr);
      }
    }
  });
  const UserForm = (props) => (
    <form id={props.id ? "edit-form" : "new-form"}>
      <input className="swal2-input" name="email" placeholder="Enter E-mail" />
      <input className="swal2-input" name="username" placeholder="Enter Username" />
    </form>
  )
  const deletion = useMutation({
    mutationFn: async (data) => await deleteUser(data),
    onSuccess: (data) => {
      onMutate();
      Swal.fire({ text: data.message, icon: "success" });
    }
  });
  const newMutation = useMutation({
    mutationFn: async (data) => await newAdmin(data),
    onSuccess: () => {
      onMutate();
      Swal.fire({ text: "Tambah Admin Berhasil", icon: "success" });
    },
    onError: (err) => {
      Swal.fire({ text: err.response?.data?.message || err.message, icon: "error" })
    }
  });
  const newFn = () => {
    Swal.fire({
      title: "New Warehouse Admin",
      html: <UserForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      }
    }).then(res => res.isConfirmed && newMutation.mutate(new FormData(res.value)));
  }
  const deleteFn = (id) => {
    Swal.fire({ 
      text: "Delete this user?", 
      icon: "question", 
      showDenyButton: true, 
      confirmButtonText: "Yes" 
    }).then (res => {
      if (res.isConfirmed) deletion.mutate(id)
    })
  };
  const editMutation = useMutation({
    mutationFn: async (data) => await editUser(editId, data),
    onSuccess: (data) => {
      onMutate();
      Swal.fire({ icon: "success", text: data?.message });
    },
    onError: (err) => {
      Swal.fire({ icon: "error", text: err.message || err.response?.data?.message })
    }
  })
  const editFn = (id) => {
    setEditId(id);
    const email = document.getElementById(`${id}-email`).textContent;
    const username = document.getElementById(`${id}-username`).textContent;
    Swal.fire({
      title: "Edit Form",
      html: <UserForm id={id} />,
      showCancelButton: true,
      didOpen: () => {
        const popup = Swal.getPopup();
        popup.querySelector('[name="email"]').value = email;
        popup.querySelector('[name="username"]').value = username;
      },
      preConfirm: () => {
        const editForm = document.getElementById("edit-form");
        const formData = new FormData(editForm);
        return formData;
      },
    }).then(res => res.isConfirmed && editMutation.mutate(res.value));
  }

  return (
    <div className="text-center">
      <Datas 
        columns={[
          ["id", "ID Pengguna"], 
          ["email", "email"], 
          ["username", "username"], 
          ["role", "role"]
        ]} 
        editFn={editFn} 
        data={users?.data?.rows} 
        deleteFn={deleteFn}
        newFn={newFn}
        caption="User"
      />
      <div className="my-5">
        <Select onChange={(e) => setPage(e.currentTarget.value)}>
          {pages.map(data => {
            return <Select.Option value={data} key={data}>Page {data}</Select.Option>
          })}
        </Select>
      </div>
    </div>
  )
}
