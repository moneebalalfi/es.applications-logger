import { usePagination, useTable } from "react-table";

interface TableProps {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: any[];
}

function Table({ columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    nextPage,
    previousPage,

    pageCount,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,

      initialState: { pageIndex: 0, pageSize: 10 }, // By Default 😅,
    },
    usePagination
  );

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className=" border rounded-lg overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 "
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody
                  className="divide-y divide-gray-200"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="p-4 text-xs whitespace-nowrap lowercase"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="pagination w-full">
        {`page ${pageIndex + 1} from ${pageOptions.length}`}
        <button
          className="bg-blue text-white text-2xl  p-4 mr-4"
          onClick={previousPage}
        >
          Prev
        </button>
        <button className="bg-blue text-white text-2xl  p-4" onClick={nextPage}>
          Next
        </button>
      </div>
    </>
  );
}

export default Table;
