import { ApplicationCommandOptionType, ApplicationCommandType, VoiceChannel } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'change-channel-name',
  defaultMemberPermissions: 'Connect',
  description: 'Изменить имя вашего канала.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "text",
      description: 'Выберите пользователя.',
      required: true,
      type: ApplicationCommandOptionType.String,
      maxLength: 22
    }
  ],
  
  run: async ({ interaction, client }) => {
    const workingChannel = interaction.guild.channels.cache.find(channel => channel.name === `voice-control`);
    const currentChannel = interaction.channel
    
    if(currentChannel !== workingChannel) {
      interaction.reply({
        content: `Вводить эту команду можно только в канале ${workingChannel}`,
        ephemeral: true
      })
      
      return;
    }
    
    const voiceChannel = interaction.member.voice.channel;
    const ownedChannel = client. voiceGenerator.get(interaction.member.id);
    
    if(!voiceChannel) {
      interaction.reply({
        content: `Вы не находитесь в голосовм канале!`,
        ephemeral: true
      })
      
      return;
    }
    
    if(!ownedChannel || voiceChannel.id !== ownedChannel){
      interaction.reply({
        content: `Вы не являетесь создателем этого канала!`,
        ephemeral: true
      })
      
      return;
    }
    
    const newName = interaction.options.get('text').value;
    voiceChannel.edit({name: `${newName}`});

    interaction.reply({
      content: `Имя канала изменено на: ${newName}.`,
      ephemeral: true
    })

    return
  }
})