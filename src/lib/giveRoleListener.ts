import { Client } from "discord.js";
import isArrayElement from "./isArrayElement";

export default (client: Client) => {
  client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isButton()) return;

    // need update
    const id_arr: string[] = ['role_btn_test', 'role_btn_test-1', 'role_btn_test-2'];
    const isRoleBtn: boolean = isArrayElement(id_arr, interaction.customId);

    if (isRoleBtn) {
      const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
      const role_name = interaction.customId.split('role_btn_')[1];
      const role = interaction.guild.roles.cache.find(role => role.name === `${role_name}`);  

      if (click_user.roles.cache.find(role => role.name === `${role_name}`)){
        interaction.reply({ 
          content: `У вас уже есть эта роль.`,
          ephemeral: true
        })
        return;
      }
      
      click_user.roles.add(role);
    
      interaction.reply({ 
        content: `Теперь у вас есть ${role} роль`,
        ephemeral: true
      })
    }
  });
}