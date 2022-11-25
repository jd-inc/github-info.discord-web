import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import CommandChannels from "../../schemas/CommandChannels";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-limit',
  defaultMemberPermissions: 'Connect',
  description: 'Изменить количество человек в этом канале.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "count",
      description: 'Введите лимит человек которыйе смогут присоедениться к вам.',
      required: true,
      type: ApplicationCommandOptionType.Number,
      maxValue: 99,
      minValue: 1
    }
  ],
  
  run: async ({ interaction }) => {
    const usersLimit = interaction.options.get("count").value;
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
      currentVoice.edit({
        userLimit: Number(usersLimit)
      })
  
      await AutoVoices.updateOne({channel_id: currentVoice.id}, {users_limit: usersLimit});
      await interaction.reply({
        content: `Лимит человек в канале тепрь ${usersLimit}`,
        ephemeral: true
      });        
    } else {
      await interaction.reply({
        content: `Только создатель канала и его приемники могут менять лимит участников.`,
        ephemeral: true
      });
    }
  }
})