import { Row } from "react-table";
import SelectFilter from "./SelectFilter";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

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
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

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
          <div className="flex space-y-4 md:space-y-0 md:space-x-4 m-0">
            <DatePicker
              placeholderText="From .."
              selected={fromDate}
              onChange={(date: Date) => setFromDate(date)}
            />

            <DatePicker
              placeholderText="To .."
              selected={toDate}
              onChange={(date: Date) => setToDate(date)}
            />
          </div>
        );

      default:
        return (
          <input
            id={id}
            className="bg-gray-50 border border-gray-300 text-sm rounded-md block w-full p-2 "
            placeholder={placeholder}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
    }
  }

  return (
    <div className="text-dark ">
      <label className="block font-bold cursor-pointer" htmlFor={id}>
        {title}
      </label>
      {FilterInput()}
    </div>
  );
}

export default FieldFilter;
