import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
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
  
  run: async ({ interaction }) => {
    const targetUser = interaction.options.getUser("user");
    const currentChannel = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;

    const channel = await AutoVoices.findOne({channel_id: currentChannel.id});    
    const channel_owner = await AutoVoices.findOne({ channel_id: interaction.member.voice.channel.id });
    const successorsArray = channel.successors; 
    
    if (!channel) {
      currentChannel.delete().catch(() => {});

      await interaction.reply({
        content: `Такого канале не существует :(`,
        ephemeral: true
      });
    }

    if (channel_owner.owner_id === cummandUsed.id  || isArrayElement(successorsArray, cummandUsed.id)) {
      currentChannel.permissionOverwrites.edit(targetUser, { "Speak": true, "Stream": true, "Connect": true })
      targetUser.send(`${cummandUsed} приглашает вас в ${currentChannel}`);  
  
      await interaction.reply({
        content: `${targetUser} приглашен в ${currentChannel}`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Только создатель канала и его приемники могут приглашать новых участников.`,
        ephemeral: true
      });
    }
  }
})