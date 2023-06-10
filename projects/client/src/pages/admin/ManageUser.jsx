import { Button, Select } from "react-daisyui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers from "../../apis/getUsers";
import { useState } from "react";
import Swal from "@/components/Swal";
import Datas from "@/components/Datas";
import deleteUser from "@/apis/deleteUser";
import TextInput from "@/components/Text";
import newAdmin from "@/apis/newAdmin";
import { useFormik } from "formik";
import editUser from "@/apis/editUser";

export default function ManageUser() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [createNew, setCreateNew] = useState(false);
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
  const deletion = useMutation({
    mutationFn: async (data) => await deleteUser(data),
    onSuccess: (data) => {
      onMutate();
      Swal.fire({ text: data.message, icon: "success" });
    }
  });
  const addNew = useMutation({
    mutationFn: async (data) => await newAdmin(data),
    onSuccess: () => {
      onMutate();
      Swal.fire({ text: "Tambah Admin Berhasil", icon: "success" });
    },
    onError: (err) => {
      Swal.fire({ text: err.response?.data?.message || err.message, icon: "error" })
    }
  });
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
      client.invalidateQueries({ queryKey: ["users"] });
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
      html: `
        <form method="POST" id="edit-form">
          <input class="swal2-input" placeholder="Enter Email" value="${email}" name="email" />
          <input class="swal2-input" placeholder="Enter Username" value="${username}" name="username" />
        </form>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const editForm = document.getElementById("edit-form");
        const formData = new FormData(editForm);
        editMutation.mutate(formData);
      },
      focusConfirm: true
    })
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      username: ""
    },
    onSubmit: (data) => {
      addNew.mutate(data);
      formik.resetForm();
    }
  });
  const toggleNew = () => setCreateNew(create => !create);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-3">
        Users
      </h1>
      <div className={`mb-6 ${createNew && "bg-base-200"} p-5`}>
        <form onSubmit={formik.handleSubmit} className={`text-left ${!createNew && "hidden"} mb-3 rounded-lg`}>
          <TextInput onChange={formik.handleChange} id="email" name="email" label="E-mail" placeholder="Enter e-mail" />
          <TextInput onChange={formik.handleChange} id="username" name="username" label="Username" placeholder="Enter username" />
          <Button type="submit" color="success" className="w-full">
            Confirm
          </Button>
        </form>
        <Button onClick={toggleNew} color={createNew ? "error" : "primary"} className="w-full">
          {createNew ? "Cancel" : "Add User"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Datas columns={["id", "email", "username", "role"]} editFn={editFn} data={users?.data?.rows} deleteFn={deleteFn} />
      </div>
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
