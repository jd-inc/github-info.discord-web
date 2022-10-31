import { client } from "../bot";
import { Event } from "../structures/Event";
import activity from "../lib/activity";

export default new Event("ready", () => {
  activity(client)
  console.log("Bot is online");
});
