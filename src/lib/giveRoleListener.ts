import { Client } from "discord.js";
import isRoleButton from "./isRoleButton";

export default (client: Client) => {
  client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isButton()) return;

    // need update
    const id_arr: string[] = ['role_btn_test', 'role_btn_test-1', 'role_btn_test-2'];
    const isRoleBtn: boolean = isRoleButton(id_arr, interaction.customId);

    if (isRoleBtn) {
      const role_name = interaction.customId.split('role_btn_')[1];
      const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
      const role = interaction.guild.roles.cache.find((role: any) => role.name === role_name);  
        click_user.roles.add(role);
    
      interaction.reply({ 
        content: `You got [${role}] role`,
        ephemeral: true
      })
    }
  });
}