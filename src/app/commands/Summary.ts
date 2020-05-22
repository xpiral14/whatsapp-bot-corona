import Command from "../models/Command";
import api, { apiEndPoints, CountryResponse } from "../../config/api";
import { Param } from "./types/Param";
import messages from "../messages";

export default class Summary extends Command {
  constructor(name: string, alias: string, help?: string) {
    super(name, alias, null, help);
  }

  public async execute(message: any) {
    const chat = message.getChat;
    const { data } = await api.get<CountryResponse[]>(apiEndPoints.summary);

    await message.reply("Resumo do corona")
  }
}
