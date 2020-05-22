import Command from "../models/Command";
import initCommand from "../commands/init";
import messages from "../messages";
import { client } from "../../server";
import Init from "../commands/init";
import botConfig from "../../config/bot";
import Summary from "../commands/Summary";
import Countries from "../commands/Countries";
import ByCountry from "../commands/ByCountry";

const commands: Command[] = [
  new Init("init", "i", "texto de inicio"),
  new Summary("resumo", "r", "Resumo"),
  new Countries("paises", "ps", "Todos os países já infectados"),
  new ByCountry("pais", "p", "Casos por país especificado"),
].map((command) => {
  //adiciona o alias em cada comando registrado na aplicação
  command.setName(botConfig.startCaractereCommand + command.getName());
  command.setAlias(botConfig.startCaractereCommand + command.getAlias());

  return command;
});

export default class CommandController {
  private message;

  constructor(message: any) {
    this.message = message;
  }

  public async executeCommand() {
    const { body } = this.message;
    const chat = await this.message.getChat();
    if (
      (await chat.fetchMessages({ searchOptions: { limit: 1 } })).length < 1
    ) {
      await chat.sendMessage(messages.pt.init);
    }

    if (!body.startsWith(botConfig.startCaractereCommand)) {
      return await this.message.reply(messages.pt.dontUnderstand);
    }

    // encontra o comando solicitado pelo cliente
    const command = commands.find((command) => {
      const commandText = getCommandNameOrAlias(body);
      return (
        commandText === command.getAlias() || commandText === command.getName()
      );
    });

    if (!command) {
      return await this.message.reply(messages.pt.commandNotExist);
    }
    try {
      command.execute(this.message);
    } catch (error) {
      this.message.reply(
        error.message || "Houve um erro na execução deste comando"
      );
    }
  }
}

function getCommandNameOrAlias(bodyMessage: string) {
  return bodyMessage.split(" ")[0];
}
