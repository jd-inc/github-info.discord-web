import { MessageActionRow, MessageButton, MessageButtonStyle } from "discord.js";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, MessageButtonStyles } from "discord.js/typings/enums";
import getLogChannelId from "../../lib/get-log-channel-id";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'role-button',
  description: 'Button to add a role.',
  type: ApplicationCommandTypes.CHAT_INPUT,

  options: [
    {
      name: "role",
      description: 'The name is required for the role without the <@> sign.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING
    },
    {
      name: "title",
      description: 'The inscription that will be on the button.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING
    },
    {
      name: "style",
      description: 'The color that the button will have.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {name: 'Green', value: 'SUCCESS'},
        {name: 'Gray', value: 'SECONDARY'},
        {name: 'Blue', value: 'PRIMARY'},
        {name: 'Red', value: 'DANGER'},
      ]
    }
  ],
  
  run: async ({client, interaction}: any) => {
    const logs_channel: any = getLogChannelId(client);
    const role_name = interaction.options.getString('role');
    const button_title = interaction.options.getString('title');
    const button_style = interaction.options.getString('style');

    const role = interaction.guild.roles.cache.find((role: any) => role.name === role_name);
    const command_user = interaction.guild.members.cache.get(interaction.member.user.id);
    
    const ChoiceValues: string[] = ['SUCCESS', 'SECONDARY', 'PRIMARY', 'DANGER'];
    const CurrentButtonStyle: any = ChoiceValues[ChoiceValues.indexOf(button_style)];    
    
    client.channels.cache.get(`${logs_channel.id}`).send(`User ${command_user} created a button to assign the role ${role}.`);
    
    interaction.reply({ components: [new MessageActionRow({
      components: [
        new MessageButton({
          customId: `role-button-${role_name}`,
          label: `${button_title}`,
          style: CurrentButtonStyle,
        })
      ]
    })]});
    
    client.on('interactionCreate', async (interaction: any) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === `role-button-${role_name}`) {
        const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
          click_user.roles.add(role);
      
        client.channels.cache.get(`${logs_channel.id}`).send(`User ${click_user} was given a role when clicking on the ${role} button.`);
        interaction.reply({ 
          content: `Role added: ${role}`,
          ephemeral: true
        })
      }
    });
  }
})