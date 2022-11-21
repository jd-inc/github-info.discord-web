import { ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-close',
  defaultMemberPermissions: 'Connect',
  description: 'Сделать ваш канал доступным только по приглашениям.',
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
        const channel_info: any = await AutoVoices.findOne({channel_id: currentChannel.id});

        if (!channel_info.is_open) {
          await interaction.reply({
            content: `Канал уже является закрытым.`
          })

          return;
        }

        await AutoVoices.updateOne({channel_id: currentChannel.id}, {is_open: false})
        currentChannel.permissionOverwrites.edit(everyone, { Connect: false })
        
        await interaction.reply({
          content: `Теперь в ${currentChannel} можно попасть только по приглашению!`
        })
      } else {
        await interaction.reply({
          content: `Только создатель канала может его закрывать.`,
          ephemeral: true
        })
      }
    } else return;
  }
})