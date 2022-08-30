import { DATA_API_ENDPOINT } from "../utils";
import fetch from "jest-fetch-mock";

describe("Check that we get all the application date from the API", () => {
  it("Verify correct HTTP status code", async () => {
    const data = fetch(DATA_API_ENDPOINT);
    expect((await data).status).toBe(200);
  });
});
