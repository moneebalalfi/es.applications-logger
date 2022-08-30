import {
  Collapse,
  Flex,
  Heading,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { ColumnInstance } from "react-table";
import FieldFilter from "./FieldFilter";

interface FiltersProps {
  fields: ColumnInstance<object>[];
  setFilter: (columnId: string, updater: any) => void;
}

function Filters({ fields, setFilter }: FiltersProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex direction={"column"}>
      <Flex
        onClick={onToggle}
        cursor="pointer"
        w={{ base: "100%", md: "30%" }}
        bg="gray.100"
        justifyContent={"space-between"}
        alignItems={"center"}
        px={6}
        py={2}
        mb={4}
      >
        <Heading fontSize={{ base: "md", md: "2xl" }} color="blue.700">
          Filter options{" "}
        </Heading>
        <Icon
          as={isOpen ? VscFilterFilled : VscFilter}
          color="blue.500"
          w={22}
          h={22}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ overflow: "visible" }}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          pt={4}
          pb={8}
          bg="white"
          mb={6}
        >
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
            preFilteredRows={fields[5].preFilteredRows}
            handleChange={setFilter}
          />
        </Stack>
      </Collapse>
    </Flex>
  );
}

export default Filters;
