import { ButtonGroup, Button } from "react-daisyui";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

/**
 *
 * @param {{ columns: any[], data: any[], deleteFn: Function, editFn: Function }} props
 * @returns
 */
export default function Datas(props) {
  const { columns, data, deleteFn, editFn } = props;
  return (
    <div className="overflow-x-auto">
      <table className="table w-full shadow-md shadow-blue-700">
        <thead>
          <tr>
            {columns.map((val, key) => <th key={key}>{val}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val) => {
            return (
              <tr key={val.id}>
                {columns.map((key, ind) => (
                  <td key={ind} id={`${val.id}-${key}`}>{val[key]}</td>
                ))}
                <td>
                  <ButtonGroup>
                    <Button color="warning" onClick={() => (editFn)(val.id)}>
                      <FaPencilAlt />
                    </Button>
                    <Button color="error" onClick={() => (deleteFn)(val.id)}>
                      <FaTrash />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th rowSpan={columns.length + 1} />
            <th />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
