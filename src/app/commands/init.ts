import messages from "../messages";
import Command from "../models/Command";
import { Chat } from "whatsapp-web.js";
import { Param } from "./types/Param";

class Init extends Command {
  constructor(name: string, alias: string, help?: string) {
    super(name, alias, null, help);
  }

  public async execute(message) {
    const chat = message.getChat();
    await chat.sendMessage(messages["pt"].init);
  }
}
export default Init;
