import { ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-open',
  defaultMemberPermissions: 'Connect',
  description: 'Открыть ваш голосовой канал для всех и каждого!',
  type: ApplicationCommandType.ChatInput,
  
  run: async ({ interaction, client }) => {
    const workingChannel = interaction.guild.channels.cache.find(channel => channel.name === `voice-control`);
    const currentChannel = interaction.channel

    if(currentChannel !== workingChannel) {
      interaction.reply({
        content: `Вводить эту команду можно только в канале ${workingChannel}`,
        ephemeral: true
      })

      return;
    }

    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guildId;
    
    if(!voiceChannel) {
      interaction.reply({
        content: `Вы не находитесь в голосовм канале!`,
        ephemeral: true
      })

      return;
    }
    
    voiceChannel.permissionOverwrites.edit(guildId, {Connect: true});

    interaction.reply({
      content: `Теперь все могут зайти в канал ${voiceChannel}!`
    })
  }
})