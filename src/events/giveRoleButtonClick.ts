import { Client } from "discord.js";
import isArrayElement from "../lib/isArrayElement";
import { Event } from "../structures/Event";

export default new Event('interactionCreate', async (interaction: any) => {
  if (!interaction.isButton()) return;

  // need update
  const id_arr: string[] = ['role_btn_Member',];
  const isRoleBtn: boolean = isArrayElement(id_arr, interaction.customId);

  if (isRoleBtn) {
    const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
    const role_name = interaction.customId.split('role_btn_')[1];
    const role = interaction.guild.roles.cache.find(role => role.name === `${role_name}`);  

    if (click_user.roles.cache.find(role => role.name === `${role_name}`)){
      click_user.roles.remove(role);
      interaction.reply({ 
        content: `Роль ${role} убрана.`,
        ephemeral: true
      })
      return;
    }
    
    click_user.roles.add(role);
  
    interaction.reply({ 
      content: `Теперь у вас есть ${role} роль.`,
      ephemeral: true
    })
  }

  if(interaction.customId === "verify_button") {
    const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
    const member_role = interaction.guild.roles.cache.find(role => role.name === `Member`);  
    const base_role = interaction.guild.roles.cache.find(role => role.name === `Ознакомлен с правилами`); 

    if (click_user.roles.cache.find(role => role.name === `Member`)){
      click_user.roles.remove(member_role);
      await interaction.reply({ 
        content: `Роль ${member_role} убрана.`,
        ephemeral: true
      })
      return;
    }
    
    click_user.roles.add(member_role);
    click_user.roles.add(base_role);
  
    await interaction.reply({ 
      content: `Теперь у вас есть ${member_role} роль`,
      ephemeral: true
    })
    return;
  }
});