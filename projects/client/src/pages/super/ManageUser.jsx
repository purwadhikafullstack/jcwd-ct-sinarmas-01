import Swal from "@/components/Swal";
import Datas from "@/components/Datas";
import useUserMutations from "@/hooks/mutations/super/useUserMutations";
import useUserQuery from "@/hooks/queries/common/useUserQuery";
import formToObj from "@/libs/formToObj";
import Loading from "@/components/Loading";
import Error from "../error/Error";

const UserForm = () => (
  <form onSubmit={() => false}>
    <input className="swal2-input" name="email" placeholder="Enter E-mail" />
    <input className="swal2-input" name="fullname" placeholder="Enter Full Name" />
    <input className="swal2-input" name="username" placeholder="Enter Username" />
  </form>
);

export default function ManageUser() {
  const { data, isError, isLoading, error } = useUserQuery();
  const { useAddMutation, useDeleteMutation, useEditMutation } = useUserMutations();
  const add = useAddMutation();
  const edit = useEditMutation();
  const del = useDeleteMutation();
  const newFn = () => {
    Swal.fire({
      title: "New Warehouse Admin",
      html: <UserForm id={0} />,
      preConfirm: () => {
        return Swal.getPopup().querySelector("form");
      },
      showCancelButton: true
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
    const email = document.getElementById(`${id}-email`).dataset.value;
    const fullname = document.getElementById(`${id}-fullname`).dataset.value;
    const username = document.getElementById(`${id}-username`).dataset.value;
    Swal.fire({
      title: "Edit Form",
      html: <UserForm id={id} />,
      showCancelButton: true,
      didOpen: () => {
        const popup = Swal.getPopup();
        popup.querySelector('[name="email"]').value = email;
        popup.querySelector('[name="fullname"]').value = fullname;
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
    <>
      {isLoading && <Loading />}
      {isError && <Error message={error.message} />}
      {!isLoading && !isError && (
        <Datas 
          columns={[
            ["id", "User ID", true],
            ["email", "email"], 
            ["fullname", "Full name"],
            ["username", "username"], 
            ["role", "role"]
          ]} 
          editFn={editFn} 
          data={data?.rows} 
          deleteFn={deleteFn}
          newFn={newFn}
          caption="User"
        />
      )}
    </>
  )
}
