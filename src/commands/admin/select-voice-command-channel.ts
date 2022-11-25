import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType } from "discord.js";
import CommandChannels from "../../schemas/CommandChannels";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'add-voice-command-channel',
  defaultMemberPermissions: 'Administrator',
  description: 'Выбрать канал для работы войс комманд.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "channel",
      description: 'Выберите канал.',
      required: true,
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ ChannelType.GuildText ]
    }
  ],
  
  run: async ({ interaction }) => {
    const channel = interaction.options.get("channel").channel;

    const newChannel = await CommandChannels.create({
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