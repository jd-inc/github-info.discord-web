import { ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import CommandChannels from "../../schemas/CommandChannels";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-close',
  defaultMemberPermissions: 'Connect',
  description: 'Сделать ваш канал доступным только по приглашениям.',
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
      const everyone = guild.roles.everyone;
      const channel_info: any = await AutoVoices.findOne({channel_id: currentVoice.id});
      
      if (!channel_info.is_open) {
        await interaction.reply({
          content: `Канал уже является закрытым.`,
          ephemeral: true
        })

        return;
      }

      await AutoVoices.updateOne({channel_id: currentVoice.id}, {is_open: false});
      currentVoice.permissionOverwrites.edit(everyone, { Connect: false });
      
      await interaction.reply({
        content: `Теперь в ${currentVoice} можно попасть только по приглашению!`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Только создатель канала и его приемники могут его закрывать.`,
        ephemeral: true
      });
    }
  }
})