import { Client } from "discord.js";

export default (client: Client): object => {
  const chennel: any = client.channels.cache.find((channel: any) => channel.name === "logs");

  const data = {
    name: chennel.name,
    id: chennel.id
  }

  return data;
}