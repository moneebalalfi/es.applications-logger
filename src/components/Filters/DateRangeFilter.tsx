import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import { Row } from "react-table";

interface DateRangeFilterProps {
  id: string;
  preFilteredRows: Row<Object>[];
  handleChange: (columnId: string, updater: any) => void;
}

function DateRangeFilter({}: DateRangeFilterProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  return (
    <RangeDatepicker
      selectedDates={selectedDates}
      onDateChange={setSelectedDates}
    />
  );
}

export default DateRangeFilter;
