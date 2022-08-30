import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Row } from "react-table";
import DateRangeFilter from "./DateRangeFilter";
import SelectFilter from "./SelectFilter";

interface FieldFilterProps {
  title: string;
  placeholder?: string;
  id: string;
  filterType?: "DEFAULT" | "SELECT" | "DATE";
  preFilteredRows?: Row<Object>[]; // Required If filterType === "SELECT"
  handleChange: (columnId: string, updater: any) => void;
}

function FieldFilter({
  title,
  id,
  placeholder,
  filterType = "DEFAULT",
  preFilteredRows,
  handleChange,
}: FieldFilterProps) {
  function FilterInput() {
    switch (filterType) {
      case "SELECT": {
        if (preFilteredRows) {
          return (
            <SelectFilter
              id={id}
              preFilteredRows={preFilteredRows}
              handleChange={handleChange}
            />
          );
        }
      }

      case "DATE":
        if (preFilteredRows) {
          return (
            <DateRangeFilter
              id={id}
              preFilteredRows={preFilteredRows}
              handleChange={handleChange}
            />
          );
        }

      default:
        return (
          <Input
            variant="filled"
            fontSize={"sm"}
            placeholder={placeholder}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
    }
  }

  return (
    <FormControl pos={"relative"}>
      <FormLabel fontSize={"sm"} color={"grey.900"} fontWeight="bold">
        {title}
      </FormLabel>
      {FilterInput()}
    </FormControl>
  );
}

export default FieldFilter;
