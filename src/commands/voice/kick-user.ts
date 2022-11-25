import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import AutoVoices from "../../schemas/AutoVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'voice-kick',
  defaultMemberPermissions: 'Connect',
  description: 'Выгнать пользователя из вашего канала.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "member",
      description: 'Выберите пользователя.',
      required: true,
      type: ApplicationCommandOptionType.User
    }
  ],
  
  run: async ({ interaction }) => {
    const targetMember = interaction.options.getUser("member");
    const { guild } = interaction;
    const currentVoice = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;

    const channel_from_db = await AutoVoices.findOne({channel_id: currentVoice.id});
    const successorsArray = channel_from_db.successors; 

    if (!channel_from_db) {
      currentVoice.delete().catch(() => {});

      await interaction.reply({
        content: `Такого канале не существует :(`,
        ephemeral: true
      });
    }

    if (channel_from_db.owner_id === cummandUsed.id || isArrayElement(successorsArray, cummandUsed.id)) {
      currentVoice.permissionOverwrites.delete(targetMember);
      guild.members.cache.get(targetMember.id).voice.disconnect();
      targetMember.send(`${cummandUsed} изгнал вас из ${currentVoice}`);  
  
      await interaction.reply({
        content: `${targetMember} изгнан из ${currentVoice}`,
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