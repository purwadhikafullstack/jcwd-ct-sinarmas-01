import { ButtonGroup, Button } from "react-daisyui";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Loading from "./Loading";

/**
 * Template Table Untuk Data
 * @param {{
 * columns: any[], data: any[], deleteFn: Function, editFn: Function,
 * newFn: Function, caption: string, readOnly: boolean
 * }} props
 * @returns
 */
export default function Datas(props) {
  const { columns, data, deleteFn, editFn, newFn, caption, readOnly } = props;
  return (
    <>
      <h1 className="text-2xl font-bold mb-3 text-center">{caption}s</h1>
      <div className="mb-5 p-5">
        <Button color="primary" onClick={newFn} fullWidth>
          New {caption}
        </Button>
      </div>
      <div className="overflow-x-auto">
        {
          data && (
            <table className="table w-full">
              <thead className="text-center">
                <tr>
                  {columns.map((val, key) => {
                    return <th key={key}>{val[1]}</th>;
                  })}
                  {!readOnly && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data?.map((val) => {
                  return (
                    <tr key={val.id}>
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
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={columns.length + 1} />
                </tr>
              </tfoot>
            </table>
          )
        }
      </div>
    </>
  );
}
