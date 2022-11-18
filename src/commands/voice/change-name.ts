import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-name',
  defaultMemberPermissions: 'Connect',
  description: 'Изменить имя вашего канала.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "text",
      description: 'Введите новое название для вашего канала.',
      required: true,
      type: ApplicationCommandOptionType.String,
      maxLength: 22
    }
  ],
  
  run: async ({ interaction }) => {
    const newName = interaction.options.get("text").value;
    
    let db_voiceId_array = [];;

    const db_voices = await  AutoVoices.find()
      db_voices.map(e => {
        db_voiceId_array.push(e.channel_id);
      });

    const currentChannel = interaction.member.voice.channel;   
    const cummandUsed = interaction.member 
    
    if (isArrayElement(db_voiceId_array, currentChannel.id)) {
      if (cummandUsed.permissions.has("ManageChannels")) {
        currentChannel.edit({
          name: `${newName}`
        })
    
        await interaction.reply({
          content: `Имя кана изменено на ${newName}`,
          ephemeral: true
        })
      } else {
        await interaction.reply({
          content: `Только создатель канала может менять его название.`,
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