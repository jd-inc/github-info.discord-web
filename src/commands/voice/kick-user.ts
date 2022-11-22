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
  
  run: async ({ interaction, client }) => {
    const targetMember = interaction.options.getUser("member");
    const { guild } = interaction;
    const currentChannel = interaction.member.voice.channel;   
    const cummandUsed = interaction.member;

    const channel_id = await AutoVoices.findOne({channel_id: currentChannel.id});
    const channel_owner = await AutoVoices.findOne({ channel_id: interaction.member.voice.channel.id });

    if (channel_id) {
      if (channel_owner.owner_id === cummandUsed.id) {
        currentChannel.permissionOverwrites.delete(targetMember);
        guild.members.cache.get(targetMember.id).voice.disconnect();
        targetMember.send(`${cummandUsed} изгнал вас из ${currentChannel}`);  
    
        await interaction.reply({
          content: `${targetMember} изгнан из ${currentChannel}`,
          ephemeral: true
        })
      } else {
        await interaction.reply({
          content: `Только создатель канала может изгонять участников.`,
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