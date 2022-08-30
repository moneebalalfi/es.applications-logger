const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DATA_API_ENDPOINT =
  "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";

const getData = async () => {
  fetch(DATA_API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => data);
};

export { fetcher, DATA_API_ENDPOINT, getData };
