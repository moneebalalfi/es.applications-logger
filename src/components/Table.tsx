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
                borderColor={"grey.900"}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <Th
                      {...column.getHeaderProps()}
                      color="grey.900"
                      borderColor={"grey.200"}
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
                            color="grey.900"
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
                  borderLeftColor="grey.900"
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
                        {...(!cell.value && { color: "gray.500" })}
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
    </>
  );
}

export default EsTable;

{
  /* <Box>
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
</Box> */
}

{
  /* <Flex>
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
</Flex> */
}
