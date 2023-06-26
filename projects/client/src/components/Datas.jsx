import { ButtonGroup, Button } from "react-daisyui";
import { FaTrash, FaPencilAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "./Loading";
import NoContent from "./NoContent";
import usePageStore from "@/hooks/store/usePageStore";

/**
 * Template Table Untuk Data
 * @param {{
 * columns: any[], data: any[], deleteFn: Function, editFn: Function,
 * newFn: Function, caption: string, readOnly: boolean
 * }} props
 * @returns
 */
export default function Datas(props) {
  const { 
    columns, 
    data, 
    deleteFn, 
    editFn, 
    newFn, 
    caption, 
    readOnly
  } = props;
  const { page, nextPage, prevPage, count } = usePageStore();

  return (
    <>
      <h1 className="text-2xl font-bold mb-3 text-center">{caption}s</h1>
      <div className="mb-5 p-5">
        <Button color="primary" onClick={newFn} fullWidth>
          New {caption}
        </Button>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center mb-4">
        <Button disabled={page === 1} color="ghost" onClick={prevPage}>
          <FaChevronLeft />
        </Button>
        <div className="text-2xl font-bold">
          {page} of {count || 1}
        </div>
        <Button disabled={page === count || page === 0} color="ghost" onClick={nextPage}>
          <FaChevronRight />
        </Button>
      </div>
      <div className="overflow-x-auto mb-5">
        <table className="table w-full">
          <thead className="text-center">
            <tr>
              <th>No</th>
              {columns.map((val, key) => {
                return <th key={key}>{val[1]}</th>;
              })}
              {!readOnly && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {
              (data && data?.length > 0) ? data?.map((val, index) => (
                <tr key={val.id}>
                  <td>{index + 1}</td>
                  {columns.map((key, ind) => {
                    const [parent, child] = key[0].split(".");
                    const value =
                      (val[parent] &&
                        (child ? val[parent][child] : val[parent])) ||
                      "(empty)";
                    return (
                      <td key={ind} id={`${val.id}-${key[0]}`}>
                        {value}
                      </td>
                    );
                  })}
                  {
                    !readOnly && 
                    <td>
                      <ButtonGroup>
                        <Button color="warning" onClick={() => editFn(val.id)}>
                          <FaPencilAlt />
                        </Button>
                        <Button color="error" onClick={() => deleteFn(val.id)}>
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    </td>
                  }
                </tr>
              )) : <tr><td><NoContent /></td></tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={columns.length + 2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
