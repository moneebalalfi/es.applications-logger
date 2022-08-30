import { Flex, HStack, Button, Icon, Text } from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  pageIndex: number;
  pageCount: number;
  previousPage: () => void;
  canPreviousPage: boolean;
  nextPage: () => void;
  canNextPage: boolean;
  pageLength: number;
}

function Pagination({
  gotoPage,
  pageIndex,
  pageCount,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageLength,
}: PaginationProps) {
  return (
    <Flex mt={4} p={6} direction="column" alignItems={"center"}>
      <HStack>
        {[1, 2, 3, 4, 5, 6, 7].map((pageNum, k) => (
          <Button
            key={k}
            size="sm"
            onClick={() => gotoPage(pageNum - 1)}
            {...(pageNum - 1 === pageIndex
              ? { variant: "solid" }
              : { variant: "ghost" })}
          >
            {pageNum}
          </Button>
        ))}
        <Text userSelect={"none"}>...</Text>
        <Button
          size="sm"
          onClick={() => gotoPage(pageCount - 1)}
          {...(pageCount - 1 === pageIndex
            ? { variant: "solid" }
            : { variant: "ghost" })}
        >
          {pageCount}
        </Button>
      </HStack>
      <HStack spacing={6} mt={4}>
        <Icon
          as={BsChevronRight}
          onClick={previousPage}
          cursor={canPreviousPage ? "pointer" : "not-allowed"}
          transform={"rotate(180deg)"}
        />
        <Text userSelect={"none"}>
          Page {pageIndex + 1} of {pageLength}
        </Text>
        <Icon
          as={BsChevronRight}
          onClick={nextPage}
          cursor={canNextPage ? "pointer" : "not-allowed"}
        />
      </HStack>
    </Flex>
  );
}

export default Pagination;
