import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log("📢tsx:18]", selectedDates);
  }, [selectedDates]);

  return (
    <RangeDatepicker
      selectedDates={selectedDates}
      onDateChange={setSelectedDates}
    />
  );
}

export default DateRangeFilter;
