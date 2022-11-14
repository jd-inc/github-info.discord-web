import { ApplicationCommandOptionType, ApplicationCommandType, VoiceChannel } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-invite',
  defaultMemberPermissions: 'Connect',
  description: 'Пригласить в ваш канал другого пользователя.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "user",
      description: 'Выберите пользователя.',
      required: true,
      type: ApplicationCommandOptionType.User
    }
  ],
  
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
    const ownedChannel = client. voiceGenerator.get(interaction.member.id)
    const targetUser = interaction.options.getUser("user");
    
    if(!voiceChannel) {
      interaction.reply({
        content: `Вы не находитесь в голосовм канале!`,
        ephemeral: true
      })

      return;
    }

    if(!ownedChannel || voiceChannel.id !== ownedChannel){
      interaction.reply({
        content: `Вы не являетесь создателем этого канала!`,
        ephemeral: true
      })

      return;
    }
    
    voiceChannel.permissionOverwrites.edit(targetUser, {Connect: true});

    targetUser.send({
      content: `Пользователь ${interaction.member} приглашает вас в закрытый канал: ${voiceChannel}.`
    })

    interaction.reply({
      content: `Пользователь ${targetUser} был приглашен в канал ${voiceChannel}.`
    })
  }
})