import { ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import isVoiceCommandChannel from "../../lib/isVoiceCommandChannel";
import AutoVoices from "../../schemas/AutoVoices";
import CommandChannels from "../../schemas/CommandChannels";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-open',
  defaultMemberPermissions: 'Connect',
  description: 'Открыть ваш голосовой канал для всех и каждого!',
  type: ApplicationCommandType.ChatInput,
  
  run: async ({ interaction }) => {    
    const { guild } = interaction;
    const currentVoice = interaction.member.voice.channel;   
    const currentChannel = interaction.channel;
    const cummandUsed = interaction.member;

    const channel_from_db = await AutoVoices.findOne({channel_id: currentVoice.id});
    const successorsArray = channel_from_db.successors; 
    
    const specialChannelsArray: string[] = await (await CommandChannels.find())
      .map((e) => {
        return e.channel_id
      })
    
    if (!isVoiceCommandChannel(currentChannel.id, specialChannelsArray)) {
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

    if (channel_from_db.owner_id === cummandUsed.id  || isArrayElement(successorsArray, cummandUsed.id)) {
      const everyone = guild.roles.everyone;
      const channel_info: any = await AutoVoices.findOne({channel_id: currentVoice.id});
        
      if (channel_info.is_open) {
        await interaction.reply({
          content: `Канал уже является открытым.`,
          ephemeral: true
        })

        return;
      }
      
      await AutoVoices.updateOne({channel_id: currentVoice.id}, {is_open: true});
      currentVoice.permissionOverwrites.edit(everyone, { Connect: true });
  
      await interaction.reply({
        content: `Теперь ${currentVoice} открыт для всех и каждого!`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Только создатель канала и его приемники могут изгонять участников.`,
        ephemeral: true
      });
    }
  }
})