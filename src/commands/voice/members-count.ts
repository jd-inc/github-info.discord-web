import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
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
      maxValue: 99
    }
  ],
  
  run: async ({ interaction }) => {
    const usersLimit = interaction.options.get("count").value;
    const currentChannel = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;

    const channel = await AutoVoices.findOne({channel_id: currentChannel.id});
    const channel_owner = await AutoVoices.findOne({channel_id: interaction.member.voice.channel.id});
    
    
    if (channel) {
      const successorsArray = channel.successors; 
      if (channel_owner.owner_id === cummandUsed.id || isArrayElement(successorsArray, cummandUsed.id)) {
        currentChannel.edit({
          userLimit: Number(usersLimit)
        })
    
        await AutoVoices.updateOne({channel_id: currentChannel.id}, {users_limit: usersLimit});
        await interaction.reply({
          content: `Лимит человек в канале тепрь ${usersLimit}`,
          ephemeral: true
        })        
      } 
      else {
        await interaction.reply({
          content: `Только создатель канала и его приемники могут менять лимит участников.`,
          ephemeral: true
        })
      }
    } else {
      currentChannel.delete().catch(() => {});

      await interaction.reply({
        content: `Такого канале не существует :(`,
        ephemeral: true
      })
    }
  }
})