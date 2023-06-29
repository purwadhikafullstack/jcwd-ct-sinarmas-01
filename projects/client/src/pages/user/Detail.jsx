import { Button, Modal } from "react-daisyui";
import { FaTimes, FaCartPlus } from "react-icons/fa";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import useGetDetail from "@/hooks/queries/common/useGetDetail";
import Loading from "@/components/Loading";
import formatRp from "@/libs/formatRp";
import { Fragment } from "react";

export default function Detail(props) {
  const { id } = useParams();
  const { disableActions } = props;
  const navigate = useNavigate();
  const goBack = () => navigate("/explore");
  const { data, isLoading, isError } = useGetDetail(id);

  return (
    <>
      <Outlet />
      <Modal open onClickBackdrop={goBack}>
        <Modal.Header className="flex">
          <div className="flex-1 text-3xl font-bold">Product Detail</div>
          <div className="flex-0">
            <Button color="ghost" onClick={goBack}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body className="p-5 text-left">
          {isLoading ? (
            <Loading />
          ) : (
            <Fragment>
              <figure className="flex justify-center items-center w-full h-[300px] mb-5">
                <img
                  className="aspect-square max-w-[400px] h-full"
                  src={data.product_image}
                  alt={data.product_name}
                />
              </figure>
              <div>
                <b className="text-3xl font-extrabold mb-3">
                  {data.product_name}
                </b>
                <div className="text-md">{data.desc}</div>
              </div>
            </Fragment>
          )}
        </Modal.Body>
        <Modal.Actions className={`p-5 ${disableActions && "hidden"}`}>
          {(!isLoading && !isError) && (
            <>
              <Button color="success">Buy {formatRp(data.price)}</Button>
              <Button color="warning" startIcon={<FaCartPlus />}>
                Add to Cart
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
