import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType } from "discord.js";
import ParentVoices from "../../schemas/ParentVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'add-parent-voice-channel',
  defaultMemberPermissions: 'Administrator',
  description: 'Выбрать канал для создания новых войс каналов.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "channel",
      description: 'Выберите канал.',
      required: true,
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ ChannelType.GuildVoice ]
    }
  ],
  
  run: async ({ interaction }) => {
    const channel = interaction.options.get("channel").channel;

    const newChannel = await ParentVoices.create({
      guild_id: interaction.guild.id,
      channel_id: channel.id
    });

    const savedChannel = await newChannel.save();
    
    await interaction.reply({
      content: 'Канал добавлен.',
      ephemeral: true
    });
  }
})