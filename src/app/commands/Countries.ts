import Command from "../models/Command";
import api, { apiEndPoints } from "../../config/api";
import messages from "../messages";

export default class Countries extends Command {
  constructor(name: string, alias: string, help?: string) {
    super(name, alias, null, help);
  }

  public async execute(message: any) {
    const chat = message.getChat();

    const { data } = await api.get(apiEndPoints.countries());

    await message.reply(
      messages.pt.infectedCountries(data)
    );
  }
}
