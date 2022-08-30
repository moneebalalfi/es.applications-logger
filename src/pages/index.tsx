import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import Table from "../components/Table";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data } = useSWR(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f",
    fetcher
  );

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

      <div className="flex-col p-8 md:p-16">
        <h1 className="text-4xl font-extrabold mb-12 text-blue-500 tracking-wide  text-center items-center ">
          Estarta Solutions Task
        </h1>
        <div>
          {!data ? (
            <>Loading ....</>
          ) : (
            <Table columns={columns} data={data.result.auditLog} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
