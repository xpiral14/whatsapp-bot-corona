import Axios from "axios";

const api = Axios.create({
  baseURL: "https://api.covid19api.com",
});

interface Params {
  from?: string;
  to?: string;
}

enum Status {
  confirmed,
  recovered,
  death,
}

export interface CountryResponse {
  Country: string;
  Slug: string;
  ISO2: string;
}
export interface LiveByCountryAllStatusResponse {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
  LocationID: string;
}

function objectParamsToURLParams(params: Params): String {
  return Object.keys(params)
    .map((paramKey) => `${paramKey}=${params[paramKey]}`)
    .join("&");
}
export const apiEndPoints = {
  summary: "/summary",
  countries: () => "/countries",
  dayOne: (country: string, status?: Status) =>
    `/dayone/country/${country}/status/${status}`,

  dayOneAllStatus: (country: string) => `/dayone/country/${country}`,

  dayOneLive: (country: string, status: Status) =>
    `/dayone/country/${country}/status/${status}/live`,

  dayOneTotal: (country: string, status?: Status) =>
    `/total/dayone/country/${country}/status/${status}`,

  dayOneTotalAllStatus: (country: string) => `/total/dayone/country/${country}`,

  byCountry: (country: string, status: string, params: Params) =>
    `/country/${country}/status/${status}${
      params && "?" + objectParamsToURLParams(params)
    }`,

  byCountryAllStatus: (country: string, params: Params) =>
    `/country/${country}${params && "?" + objectParamsToURLParams(params)}`,

  byCountryLive: (country, status: Status, params: Params) =>
    `country/${country}/status/${status}/live${
      params && "?" + objectParamsToURLParams(params)
    }`,

  byCountryTotal: (country: string, status: Status) =>
    `/total/country/${country}/status/${status}`,

  byCountryTotalAllStatus: (country: string) => `/total/country/${country}`,

  liveByCountryAndStatus: (country: string, status: Status) =>
    `/live/country/${country}/status/${status}`,

  liveByCountryAllStatus: (country: string) => `/live/country/${country}`,

  liveByCountryAndStatusAfterDate: (
    country: string,
    status: Status,
    date: string
  ) => `/live/country/${country}/status/${status}/date/${date}`,

  worldWip: (params: Params) =>
    `/world${params && "?" + objectParamsToURLParams(params)}`,

  worldTotalWip: () => `/world/total`,
  allData: () => `/all`,
  stats: () => `/stats`,
  webHook: () => `/webhook`,
  version: () => `/version`,
};
export default api;
