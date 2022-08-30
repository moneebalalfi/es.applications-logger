/* eslint-disable react/jsx-key */

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IoArrowUpOutline } from "react-icons/io5";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import Filters from "./Filters";
import Pagination from "./Pagination";

interface TableProps {
  columns: any;
  data: object[];
  caption?: string;
}

function EsTable({ columns, data, caption }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    columns: fields,
    setFilter,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageOptions: { length },
    gotoPage,
    pageCount,
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
      {/* Filter Inputs */}
      <Filters fields={fields} setFilter={setFilter} />

      {/* The Actual table */}
      <Box overflowX="scroll">
        <Table
          variant="simple"
          {...getTableProps()}
          {...(!page.length && { opacity: 0.6 })}
        >
          <Thead overflowY="auto" overflowX="hidden">
            {headerGroups.map((headerGroup) => (
              <Tr
                borderLeft={"2px solid"}
                borderColor={"gray.900"}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <Th
                      {...column.getHeaderProps()}
                      color="gray.900"
                      borderColor={"gray.200"}
                      fontWeight="800"
                      fontSize="xs"
                      paddingY={{ base: 2, md: 6 }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        {...(column.canSort
                          ? column.getSortByToggleProps()
                          : {})}
                      >
                        {column.render("Header")}
                        {column.canSort && column.isSorted && (
                          <Box
                            width="15px"
                            marginLeft={2}
                            color="gray.900"
                            {...(!column.isSortedDesc && {
                              transform: "rotate(180deg)",
                            })}
                          >
                            <IoArrowUpOutline />
                          </Box>
                        )}
                      </Box>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>

          <Tbody
            {...getTableBodyProps()}
            fontSize="sm"
            overflowY="auto"
            overflowX="hidden"
          >
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  borderLeft="2px solid"
                  borderLeftColor="gray.900"
                  alignItems="center"
                  {...(index % 2 === 0 && {
                    backgroundColor: "white",
                  })}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        border={"none"}
                        p={{ base: 1, md: 4 }}
                        {...(!cell.value && { color: "gray.300" })}
                        textTransform="lowercase"
                      >
                        {cell.value ? cell.render("Cell") : "--/--"}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>

          {caption && (
            <TableCaption paddingY={0} marginBottom={0}>
              {caption}
            </TableCaption>
          )}
        </Table>

        {!page.length && (
          <Alert
            mt={4}
            colorScheme="blue"
            variant="subtle"
            fontSize={{ base: "sm", md: "md" }}
          >
            <AlertIcon />
            <AlertTitle mr={{ md: 2 }}>Nothing found</AlertTitle>
            <AlertDescription>
              on this table ... Try a new search!
            </AlertDescription>
          </Alert>
        )}
      </Box>
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageLength={length}
      />
    </>
  );
}

export default EsTable;
