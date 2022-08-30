import { Container, Heading, Box } from "@chakra-ui/react";

function Header() {
  return (
    <Box
      as="header"
      paddingY={4}
      borderBottom={"1px solid"}
      borderBottomColor="gray.100"
    >
      <Container maxWidth={"container.xl"}>
        <Heading color={"blue.700"} letterSpacing={3} fontWeight={"800"}>
          ES-App Logger
        </Heading>
      </Container>
    </Box>
  );
}

export default Header;
