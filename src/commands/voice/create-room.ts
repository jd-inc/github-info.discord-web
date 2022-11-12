import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, VoiceState } from "discord.js";
import { joinVoiceChannel } from '@discordjs/voice'
import { SlashCommand } from "../../structures/Command";
import { client } from "../../bot";

export default new SlashCommand({
  name: 'create-voice-room',
  defaultMemberPermissions: 'SendMessages',
  description: 'description',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "name",
      description: 'Имя канала.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  
  run: async ({ interaction }: any) => {
    const channel_name = interaction.options.getString('chanel_name');

    const curent_chennel = interaction.guild.channels.cache.find(channel => channel.name === `voice-control`);  
    if(curent_chennel === 'voice-control') {
      await interaction.reply({
        content: 'Перейдите в канал [voice-control] для работы командами войс чата.',
        ephemeral: true,
      })
      return;
    }

    await interaction.reply({
      content: 'a',
      ephemeral: true
    })
  }
})