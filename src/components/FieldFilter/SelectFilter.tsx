import { useMemo } from "react";
import { TbSelect } from "react-icons/tb";
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
    <div className="relative">
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full md:w-[200px] p-2 appearance-none cursor-pointer"
        onChange={(e) => handleChange(id, e.target.value)}
      >
        <option value="">All</option>{" "}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <TbSelect
        className="absolute pointer-events-none inset-y-0 right-0 flex items-center px-2"
        size={40}
      />
    </div>
  );
};

export default SelectFilter;
