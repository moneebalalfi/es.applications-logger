import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import Header from "../components/layouts/Header";
import PageContent from "../components/layouts/PageContent";
import Loading from "../components/Loading";
import EsTable from "../components/Table";
import { fetcher } from "../utils";

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
        bgGradient="linear(to-br, white 60%, grey.100 )"
      >
        <Header />

        <PageContent>
          {!data ? (
            <Loading />
          ) : (
            <EsTable
              columns={columns}
              data={data.result.auditLog}
              caption="ES-Application logger table"
            />
          )}
        </PageContent>
      </Flex>
    </>
  );
};

export default Home;
