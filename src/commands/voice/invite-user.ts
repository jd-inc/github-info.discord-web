import { ApplicationCommandOptionType, ApplicationCommandType, VoiceChannel } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'invite-user',
  defaultMemberPermissions: 'Connect',
  description: 'Пригласить в ваш канал другого пользователя',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "user",
      description: 'Выберите пользователя.',
      required: true,
      type: ApplicationCommandOptionType.User
    }
  ],
  
  run: async ({ interaction }) => {
    const voiceChannel = interaction.member.voice.channel;
    if(!voiceChannel) {
      interaction.reply({
        content: `Вы не находитесь в голосовм канале!`,
        ephemeral: true
      })
      
      return;
    }
    
    const targetUser = interaction.options.getUser("user");
    voiceChannel.permissionOverwrites.edit(targetUser, {Connect: true});

    targetUser.send({
      content: `Пользователь ${interaction.member} приглашает вас в закрытый канал: ${voiceChannel}.`
    })

    interaction.reply({
      content: `Пользователь ${targetUser} был приглашен в канал ${voiceChannel}.`
    })
  }
})