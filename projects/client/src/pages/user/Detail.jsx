import { Button, Card } from "react-daisyui";
import { FaTimes, FaCartPlus } from "react-icons/fa";
import { useParams, Outlet } from "react-router-dom";
import useGetDetail from "@/hooks/queries/common/useGetDetail";
import Loading from "@/components/Loading";
import formatRp from "@/libs/formatRp";
import { Fragment, useEffect, useRef } from "react";
import useCartMutations from "@/hooks/mutations/common/useCartMutations";
import { getId } from "@/api/token";
import Swal from "@/components/Swal";

export default function Detail(props) {
  const { id } = useParams();
  const { disableActions } = props;
  const goBack = () => window.history.back();
  const { data, isLoading, isError } = useGetDetail(id);
  const { useAddMutation } = useCartMutations();
  const add = useAddMutation();
  const addToCart = (obj) => {
    Swal.fire("Item added to cart").then(res => res && window.history.back());
    add.mutate(obj)
  };
  const user_id = getId();
  const top = useRef();

  useEffect(() => {
    top.current.focus();
  }, []);
  return (
    <>
      <Outlet />
      <Card ref={top}>
        <Card.Body className="p-5 text-left">
          <Card.Title className="flex">
            <div className="flex-1 text-3xl font-bold">Product Detail</div>
            <div className="flex-0">
              <Button color="ghost" onClick={goBack}>
                <FaTimes />
              </Button>
            </div>
          </Card.Title>
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
              <div className="w-full">
                <b className="text-3xl font-extrabold mb-3">
                  {data.product_name}
                </b>
                <div className="text-md">{data.desc}</div>
              </div>
            </Fragment>
          )}
        </Card.Body>
        <Card.Actions
          className={`p-5 ${
            disableActions && "hidden"
          } flex`}
        >
          {!isLoading && !isError && (
            <>
              <b className="text-3xl font-extrabold underline flex-1">
                {formatRp(data.price)}
              </b>
              <Button
                className="flex-0"
                color="warning"
                startIcon={<FaCartPlus />}
                onClick={() => addToCart({ user_id, product_id: data.id })}
              >
                Add to Cart
              </Button>
            </>
          )}
        </Card.Actions>
      </Card>
    </>
  );
}
