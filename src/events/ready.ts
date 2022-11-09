import { client } from "../bot";
import { Event } from "../structures/Event";

import activity from "../lib/activity";
import giveRoleListener from "../lib/listeners/giveRoleListener";

export default new Event("ready", () => {
  //setup
  activity(client);

  //workflow
  giveRoleListener(client);

  console.log("Bot is online");
});