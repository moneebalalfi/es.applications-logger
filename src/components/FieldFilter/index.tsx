import { Row } from "react-table";
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
        return <>date filter</>;

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
