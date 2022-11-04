import { client } from "../bot";
import { Event } from "../structures/Event";

import activity from "../lib/activity";
import giveRoleListerner from "../lib/giveRoleListener";

export default new Event("ready", () => {
  //setup
  activity(client);

  //workflow
  giveRoleListerner(client);

  console.log("Bot is online");
});