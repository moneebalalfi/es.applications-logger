import { Flex, CircularProgress } from "@chakra-ui/react";

function Loading() {
  return (
    <Flex h="80vh" alignItems={"center"} justifyContent="center">
      <CircularProgress isIndeterminate color="blue.300" />
    </Flex>
  );
}

export default Loading;
