import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../structures/Command";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";

export default new SlashCommand({
  name: 'voice-successor',
  defaultMemberPermissions: 'Connect',
  description: 'Выдать права создателя канала.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "user",
      description: 'Выберите приемника.',
      required: true,
      type: ApplicationCommandOptionType.User
    }
  ],
  
  run: async ({ interaction }) => {
    const targetUser = interaction.options.getUser("user");
    const currentVoice = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;

    const channel = await AutoVoices.findOne({channel_id: currentVoice.id});    
    const channel_owner = await AutoVoices.findOne({ channel_id: interaction.member.voice.channel.id });
    const successorsArray = channel.successors;
    
    if (!channel) {
      currentVoice.delete().catch(() => {});

      await interaction.reply({
        content: `Такого канале не существует :(`,
        ephemeral: true
      });
    }

    if (channel_owner.owner_id === cummandUsed.id || isArrayElement(successorsArray, cummandUsed.id )) {
      targetUser.send(`${cummandUsed} назначет вас приемником в ${currentVoice}`);  
      const updatedSuccessorsArray = new Set([...successorsArray, targetUser.id]);

      await AutoVoices.updateOne({channel_id: currentVoice.id}, {successors: Array.from(updatedSuccessorsArray)});
      await interaction.reply({
        content: `Приемник выбран.`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Только создатель канала и его приемники могут добавлять новых приемников.`,
        ephemeral: true
      });
    }
  }
})