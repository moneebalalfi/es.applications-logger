/* eslint-disable react/jsx-key */

import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import FieldFilter from "./FieldFilter";
import {
  HiOutlineSortDescending,
  HiOutlineSortAscending,
} from "react-icons/hi";

interface TableProps {
  columns: any[];
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
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="filter-bar flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-2">
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

        <FieldFilter
          title="Date"
          id="creationTimestamp"
          filterType="DATE"
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
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            className="px-4 py-2  lg:px-6 lg:py-3 text-[10px] sm:text-xs font-bold text-gray-500 text-center lg:max-w-[200px]"
                          >
                            {column.render("Header")}
                            {column.isSorted && (
                              <>
                                {column.isSortedDesc ? (
                                  <HiOutlineSortDescending className="inline-block text-lg ml-2" />
                                ) : (
                                  <HiOutlineSortAscending className="inline-block text-lg ml-2" />
                                )}
                              </>
                            )}
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
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        role={"row"}
                        {...row.getRowProps()}
                        className={`${i % 2 === 0 && "bg-blue-200"}`}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              role={"cell"}
                              {...cell.getCellProps()}
                              className={`p-4 text-xs whitespace-nowrap  lg:whitespace-normal lowercase text-center lg:max-w-[200px] ${
                                !cell.value && "text-gray-400"
                              }`}
                            >
                              {cell.value ? cell.render("Cell") : "--/--"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {!page.length && (
              <div
                className="p-4 text-sm text-blue-700 bg-blue-200 rounded-md w-full  border-2 border-slate-100 mt-8"
                role="alert"
              >
                <span className="font-bold">Nothing found!</span> ... Try a new
                search 🔎
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pagination w-full">
        {`page ${pageIndex + 1} from ${pageOptions.length}`}
        <button
          className="bg-blue-400 text-white text-2xl  py-2 px-6 mr-2 "
          onClick={previousPage}
        >
          Prev
        </button>
        <button
          className="bg-blue-400 text-white text-2xl  py-2 px-6"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Table;
