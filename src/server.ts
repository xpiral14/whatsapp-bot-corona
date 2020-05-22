import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import CommandController from "./app/controllers/CommandController";
const client = new Client();

client.on("qr", (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp bot has been connected.");
});

client.on("auth_failure", () => {
  console.log("Autentication failed.");
});

client.on("disconnected", (reason: any) => {
  console.log("Client was logged out");
});

client.on("group_join", (notification: { reply: (args: string) => void }) => {
  notification.reply("User joined the group.");
});

client.on("group_leave", (notification: { reply: (args: string) => void }) => {
  notification.reply("User left the group.");
});

client.on("message", async (message) => {
  const commandController = new CommandController(message);
  await commandController.executeCommand();
});

client.initialize();

export { client };
