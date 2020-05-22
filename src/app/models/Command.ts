import { Param } from "../commands/types/Param";

export default class Command {
  private name: string;

  private alias: string;

  private help: string;

  protected params: string[];

  constructor(name: string, alias: string, params?: string[], help?: string) {
    this.name = name;
    this.alias = alias;
    this.help = help;
    this.params = params;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getAlias() {
    return this.alias;
  }

  public setAlias(alias: string) {
    this.alias = alias;
  }

  public execute(message: any) {}

  public setHelp(help: string) {
    this.help = help;
  }

  public getHelp() {
    return this.help;
  }

  public getParams() {
    return this.params;
  }

  public setNewParam(param: string) {
    this.params = [...this.params, param];
  }

  public isValidParam(paramName: string) {
    return this.params.includes(paramName);
  }
}
