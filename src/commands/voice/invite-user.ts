import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import CommandChannels from "../../schemas/CommandChannels";
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
    const currentVoice = interaction.member.voice.channel;   
    const currentChannel = interaction.channel; 
    const cummandUsed = interaction.member;

    const channel_from_db = await AutoVoices.findOne({channel_id: currentVoice.id});
    const successorsArray = channel_from_db.successors; 
    
    const specialChannelsArray: string[] = await (await CommandChannels.find())
      .map((e) => {
        return e.channel_id
      })
       
    if (!isArrayElement(specialChannelsArray, currentChannel.id)) {
      interaction.reply({
        content: `Используйте специальный канал для войс комманд.`,
        ephemeral: true
      })

      return;
    }

    if (!channel_from_db) {
      currentVoice.delete().catch(() => {});

      await interaction.reply({
        content: `Такого канале не существует :(`,
        ephemeral: true
      });
    }

    const canUseCommand: boolean = channel_from_db.owner_id === cummandUsed.id 
    || isArrayElement(successorsArray, cummandUsed.id) 
    || isArrayElement(channel_from_db.admins, cummandUsed.id);
  
    if (canUseCommand) {      
      currentVoice.permissionOverwrites.edit(targetUser, { "Speak": true, "Stream": true, "Connect": true })
      targetUser.send(`${cummandUsed} приглашает вас в ${currentVoice}`);  
  
      await interaction.reply({
        content: `${targetUser} приглашен в ${currentVoice}`,
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