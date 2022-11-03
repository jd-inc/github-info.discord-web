import { client } from "../bot";
import { Event } from "../structures/Event";
import activity from "../lib/activity";

export default new Event("ready", () => {
  activity(client);

  function name(arr: any[], elem: string) {
    return arr.includes(elem);
  }

  client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isButton()) return;

    // need update
    const id_arr = ['test', 'test-1', 'test-2'];
    if (name(id_arr, interaction.customId)) {
      const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
      const role = interaction.guild.roles.cache.find((role: any) => role.name === interaction.customId);  
        click_user.roles.add(role);
    
      interaction.reply({ 
          content: `${interaction.customId}`,
          ephemeral: true
      })
    }
  });

  console.log("Bot is online");
});