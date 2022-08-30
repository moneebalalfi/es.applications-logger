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
          <div className="flex flex-col lg:flex-row">
            <DatePicker
              placeholderText="From .."
              className="mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />

            <DatePicker
              placeholderText="To .."
              className="w-full lg:w-auto"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
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
      <label
        className="block font-bold cursor-pointer text-xs md:text-md mb-2"
        htmlFor={id}
      >
        {title}
      </label>
      {FilterInput()}
    </div>
  );
}

export default FieldFilter;
