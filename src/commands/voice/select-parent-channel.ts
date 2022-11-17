import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, VoiceChannel } from "discord.js";
import AutoVoices from "../../schemas/AutoVoices";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'select-channel',
  defaultMemberPermissions: 'Administrator',
  description: 'Пригласить в ваш канал другого пользователя.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "channel",
      description: 'Выберите канал для работы.',
      required: true,
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ ChannelType.GuildVoice ]
    }
  ],
  
  run: async ({ interaction, client }) => {
    const channel = interaction.options.get("channel").channel;

    const newId = await AutoVoices.create({
      guild_id: interaction.guild.id,
      channel_id: channel.id
    });

    const savedId = await newId.save();
    
    await interaction.reply({
      content: 'готово крч',
      ephemeral: true
    })
  }
})