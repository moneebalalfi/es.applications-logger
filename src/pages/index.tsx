import {
  Box,
  CircularProgress,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import EsTable from "../components/Table";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data } = useSWR(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f",
    fetcher
  );

  if (data) console.log(data);

  const columns = useMemo(
    () => [
      {
        Header: "Log ID",
        accessor: "logId",
      },
      {
        Header: "Application Type",
        accessor: "applicationType",
      },
      {
        Header: "Application ID",
        accessor: "applicationId",
      },
      {
        Header: "Action",
        accessor: "actionType",
      },
      {
        Header: "Action Details",
        accessor: "logInfo",
      },
      {
        Header: "Date: Time",
        accessor: "creationTimestamp",
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>ES - Application Logger</title>
      </Head>
      <Flex
        direction={"column"}
        bgGradient="linear(to-br, white 60%, purple.50 )"
      >
        <Box
          as="header"
          paddingY={4}
          borderBottom={"1px solid"}
          borderBottomColor="gray.100"
        >
          <Container maxWidth={"container.xl"}>
            <Heading color={"purple.700"} letterSpacing={3} fontWeight={"800"}>
              ES-App Logger
            </Heading>
          </Container>
        </Box>

        <Flex alignItems={"center"} flexDir={"column"} p={8}>
          <Container maxWidth={"container.xl"}>
            {!data ? (
              <Flex h="80vh" alignItems={"center"} justifyContent="center">
                <CircularProgress isIndeterminate color="purple.300" />
              </Flex>
            ) : (
              <EsTable
                columns={columns}
                data={data.result.auditLog}
                caption="ES-Application logger table"
              />
            )}
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
