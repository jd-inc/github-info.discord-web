import { ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-open',
  defaultMemberPermissions: 'Connect',
  description: 'Открыть ваш голосовой канал для всех и каждого!',
  type: ApplicationCommandType.ChatInput,
  
  run: async ({ interaction }) => {    
    const { guild } = interaction;
    let db_voiceId_array = [];
    
    const db_voices = await AutoVoices.find()
      db_voices.map(e => {
        db_voiceId_array.push(e.channel_id);
      });
    const channel_owner = await AutoVoices.findOne({ channel_id: interaction.member.voice.channel.id });

    const currentChannel = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;
    
    if (isArrayElement(db_voiceId_array, currentChannel.id)) {
      if (channel_owner.owner_id === cummandUsed.id) {
        const everyone = guild.roles.everyone;
        currentChannel.permissionOverwrites.edit(everyone, { Connect: true })
    
        await interaction.reply({
          content: `Теперь ${currentChannel} открыт для всех и каждого!`
        })
      } else {
        await interaction.reply({
          content: `Только создатель канала может изгонять участников.`,
          ephemeral: true
        })
      }
    } else return;
  }
})