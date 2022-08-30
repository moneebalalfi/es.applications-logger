import { Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { Row } from "react-table";

interface SelectFilterProps {
  id: string;
  preFilteredRows: Row<Object>[];
  handleChange: (columnId: string, updater: any) => void;
}

const SelectFilter = ({
  id,
  preFilteredRows,
  handleChange,
}: SelectFilterProps) => {
  const options = useMemo(() => {
    const options: Record<string, any> = new Set(); // Set() ? Because I want Unique Values ⭐️
    preFilteredRows.forEach((row) => {
      if (row.values[id]) {
        /*
        If a field has no value 
        we don't want include it in the select options.🤞🏻
        */
        options.add(row.values[id]);
      }
    });

    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      onChange={(e) => handleChange(id, e.target.value)}
      variant="filled"
      fontSize={"sm"}
      bg={"purple.100"}
    >
      <option value="">All</option>{" "}
      {options.map((option, i) => (
        <option key={i} value={option} style={{ fontSize: "13px" }}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default SelectFilter;
