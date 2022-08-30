import { Row } from "react-table";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

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
        return (
          <Flex>
            <DatePicker
              placeholderText="From .."
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />

            <DatePicker
              placeholderText="To .."
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Flex>
        );

      default:
        return (
          <Input
            variant="filled"
            fontSize={"sm"}
            bg={"purple.100"}
            placeholder={placeholder}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
    }
  }

  return (
    <FormControl>
      <FormLabel fontSize={"sm"} color={"purple.900"} fontWeight="bold">
        {title}
      </FormLabel>
      {FilterInput()}
    </FormControl>
  );
}

export default FieldFilter;
