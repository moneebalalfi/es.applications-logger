import {
  Button,
  Collapse,
  Flex,
  Heading,
  Icon,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { ColumnInstance } from "react-table";
import FieldFilter from "./FieldFilter";

interface FiltersProps {
  fields: ColumnInstance<object>[];
  resetFilters: any;
}

function Filters({ fields, resetFilters }: FiltersProps) {
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
        <VStack mb={6}>
          <Stack
            w="100%"
            direction={{ base: "column", lg: "row" }}
            pt={4}
            pb={8}
            bg="white"
          >
            <FieldFilter
              title="Application ID"
              placeholder="e.g 3757..."
              id="applicationId"
              handleChange={fields[2].setFilter}
              filterValue={fields[2].filterValue}
            />

            <FieldFilter
              title="Application type"
              id="applicationType"
              filterType="SELECT"
              preFilteredRows={fields[1].preFilteredRows}
              handleChange={fields[1].setFilter}
              filterValue={fields[1].filterValue}
            />

            <FieldFilter
              title="Action type"
              id="actionType"
              filterType="SELECT"
              preFilteredRows={fields[3].preFilteredRows}
              handleChange={fields[3].setFilter}
              filterValue={fields[3].filterValue}
            />

            <FieldFilter
              title="Date"
              id="creationTimestamp"
              filterType="DATE"
              preFilteredRows={fields[5].preFilteredRows}
              handleChange={fields[5].setFilter}
              filterValue={fields[5].filterValue}
            />
          </Stack>
          <Button
            width="200px"
            alignSelf={"end"}
            onClick={() => resetFilters([])}
          >
            Clear filters
          </Button>
        </VStack>
      </Collapse>
    </Flex>
  );
}

export default Filters;
