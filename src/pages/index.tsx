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
        accessor: (val: any) => {
          return val.applicationType ? (
            val.applicationType
          ) : (
            <span className="text-gray-400">---/---</span>
          );
        },
      },
      {
        Header: "Application ID",
        accessor: (val: any) => {
          return val.applicationId ? (
            val.applicationId
          ) : (
            <span className="text-gray-400">---/---</span>
          );
        },
      },
      {
        Header: "Action",
        accessor: (val: any) => {
          return val.actionType ? (
            val.actionType
          ) : (
            <span className="text-gray-400">---/---</span>
          );
        },
      },
      {
        Header: "Action Details",
        accessor: (val: any) => {
          return val.logInfo ? (
            val.logInfo
          ) : (
            <span className="text-gray-400">---/---</span>
          );
        },
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
