import { client } from "../bot";
import { Event } from "../structures/Event";
import activity from "../lib/activity";

export default new Event("ready", () => {
  activity(client);

  function name(arr: any[], elem: string) {
    // arr = arr.map((e: any) => {
    //   return e.split('role_btn_')
    // })
    return arr.includes(elem);
  }

  client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isButton()) return;

    // need update
    const id_arr = ['role_btn_test', 'role_btn_test-1', 'role_btn_test-2'];
    const isRoleBtn = name(id_arr, interaction.customId);
    
    if (isRoleBtn) {
      const role_name = interaction.customId.split('role_btn_')[1];
      const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
      const role = interaction.guild.roles.cache.find((role: any) => role.name === role_name);  
        click_user.roles.add(role);
    
      interaction.reply({ 
          content: `You got [${role}] a role`,
          ephemeral: true
      })
    }
  });

  console.log("Bot is online");
});