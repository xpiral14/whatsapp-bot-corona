import Command from "../models/Command";
import getparams from "../../utils/getParams";
import api, {
  apiEndPoints,
  LiveByCountryAllStatusResponse,
} from "../../config/api";
import messages from "../messages";

export default class ByCountry extends Command {
  constructor(name: string, alias: string, help?: string) {
    super(name, alias, null, help);
    this.params = ["pais"];
  }

  public async execute(message: any) {
    const { body } = message;
    const params = getparams(body);
    console.log(params);
    Object.keys(params).forEach((param) => {
      if (!this.isValidParam(param)) {
        throw new Error(`O parâmetro ${param} não é valido para esse comando`);
      }
    });

    const { data } = await api.get<LiveByCountryAllStatusResponse[]>(
      apiEndPoints.liveByCountryAllStatus(params["pais"])
    );

    message.reply(messages.pt.liveByCountryAllStatus(data[data.length - 1]));
  }
}
