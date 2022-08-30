import { Container, Flex } from "@chakra-ui/react";

function PageContent({ children }: { children: JSX.Element }) {
  return (
    <Flex alignItems={"center"} flexDir={"column"} p={{ base: 4, md: 8 }}>
      <Container maxWidth={"container.xl"}>{children}</Container>
    </Flex>
  );
}

export default PageContent;
