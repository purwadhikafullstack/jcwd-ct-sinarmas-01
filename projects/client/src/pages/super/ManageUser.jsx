import { Select } from "react-daisyui";
import { useState } from "react";
import Swal from "@/components/Swal";
import Datas from "@/components/Datas";
import useUserMutations from "@/hooks/mutations/super/useUserMutations";
import useUserQuery from "@/hooks/queries/useUserQuery";
import formToObj from "@/libs/formToObj";
import countToArr from "@/libs/countToArr";

export default function ManageUser() {
  const [editId, setEditId] = useState(0);

  const users = useUserQuery();
  const { goToPage, nextPage, prevPage, pagesCount, page } = users;
  const { useAddMutation, useDeleteMutation, useEditMutation } = useUserMutations();
  const add = useAddMutation();
  const edit = useEditMutation();
  const del = useDeleteMutation();
  const pages = countToArr(pagesCount);
  const UserForm = (props) => (
    <form onSubmit={() => false}>
      <input className="swal2-input" name="email" placeholder="Enter E-mail" />
      <input className="swal2-input" name="fullname" placeholder="Enter Full Name" />
      <input className="swal2-input" name="username" placeholder="Enter Username" />
    </form>
  );
  const newFn = () => {
    Swal.fire({
      title: "New Warehouse Admin",
      html: <UserForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      }
    }).then(res => {
      const form = new FormData(res.value);
      console.log(formToObj(form));
      res.isConfirmed && add.mutate(formToObj(form));
    });
  }
  const deleteFn = (id) => {
    Swal.fire({ 
      text: "Delete this user?", 
      icon: "question", 
      showDenyButton: true, 
      confirmButtonText: "Yes" 
    }).then (res => res.isConfirmed && del.mutate(id));
  };
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
        return Swal.getPopup().querySelector("form");
      },
    }).then(res => {
      const form = new FormData(res.value);
      form.append("id", id);
      res.isConfirmed && edit.mutate(formToObj(form));
    });
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
        goToPage={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
        pagesCount={users?.data?.pages}
        pages={pages}
      />
    </div>
  )
}
