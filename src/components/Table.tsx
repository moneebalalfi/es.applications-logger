/* eslint-disable react/jsx-key */

import { useFilters, usePagination, useTable } from "react-table";
import FieldFilter from "./FieldFilter";

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
    setFilter,

    pageOptions,

    columns: fields,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // By Default 😅,
    },
    useFilters,
    usePagination
  );

  return (
    <>
      <div className="filter-bar flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-2">
        <FieldFilter
          title="Application ID"
          placeholder="e.g 3757..."
          id="applicationId"
          handleChange={setFilter}
        />

        <FieldFilter
          title="Application type"
          id="applicationType"
          filterType="SELECT"
          preFilteredRows={fields[1].preFilteredRows}
          handleChange={setFilter}
        />

        <FieldFilter
          title="Action type"
          id="actionType"
          filterType="SELECT"
          preFilteredRows={fields[3].preFilteredRows}
          handleChange={setFilter}
        />
      </div>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className=" border rounded-lg overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => {
                    return (
                      <tr role={"row"} {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map((column) => (
                          <th
                            role={"columnheader"}
                            {...column.getHeaderProps()}
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 "
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    );
                  })}
                </thead>

                <tbody
                  className="divide-y divide-gray-200"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr role={"row"} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              role={"cell"}
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
