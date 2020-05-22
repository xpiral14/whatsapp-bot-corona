import {
  CountryResponse,
  LiveByCountryAllStatusResponse,
} from "../../config/api";

const messages = {
  en: {
    init: "Welcome dto chatBot",
    dontUnderstand: "Sorry, I dont understand.",
    commandNotExist: "Solicited command not exists",
    infectedCountries: (countries: CountryResponse[]) =>
      `Infected countries are ${countries
        .map((country) => country.Country)
        .join(", ")}`,
  },

  pt: {
    init: "Seja bem vindo ao chatBot",
    dontUnderstand: "Desculpe, não entendi.",
    commandNotExist: "O comando solicitado não existe",
    infectedCountries: (countries: CountryResponse[]) =>
      `os países infectados são: ${countries
        .map((country, index) => `${index} - ${country.Country}`)
        .join("\n")}`,
    liveByCountryAllStatus: (
      country: LiveByCountryAllStatusResponse
    ) => `Casos confirmados: ${country.Confirmed}
    Mortes: ${country.Deaths}
    Curados: ${country.Recovered}`,
  },
};

export default messages;
