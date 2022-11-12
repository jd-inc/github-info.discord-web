import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, VoiceState } from "discord.js";
import { joinVoiceChannel } from '@discordjs/voice'
import { SlashCommand } from "../../structures/Command";
import { client } from "../../bot";

export default new SlashCommand({
  name: 'create-voice-room',
  defaultMemberPermissions: 'SendMessages',
  description: 'description',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "name",
      description: 'Имя канала.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  
  run: async ({ interaction }: any) => {
    const channel_name = interaction.options.getString('chanel_name');

    const curent_chennel = interaction.guild.channels.cache.find(channel => channel.name === `voice-control`);  
    if(curent_chennel === 'voice-control') {
      await interaction.reply({
        content: 'Перейдите в канал [voice-control] для работы командами войс чата.',
        ephemeral: true,
      })
      return;
    }

    // client.on('voiceStateUpdate', async (oldState, newState) => {
    //   const { member, guild } = newState;
    //   const newChannel = newState.channel;
    //   const oldChannel = oldState.channel;
    //   const parentChannel = '1014073028059074573';

    //   if(oldChannel !== newChannel && newChannel && newChannel.id === parentChannel) {
    //     const voiceChannel = await guild.channels.create({
    //       name: `${member.user.username}'s channel`, 
    //       type: ChannelType.GuildVoice,
    //       parent: newChannel.parent,
    //       permissionOverwrites: [
    //         {id: member.id, allow: ["Connect"]},
    //         {id: guild.id, deny : ["Connect"]}
    //       ]
    //     })

    //     client.voiceGenerator.set(member.id, voiceChannel.id);

    //     await newChannel.permissionOverwrites.edit(member, {Connect: false});
    //     setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

    //     setTimeout(() => member.voice.setChannel(voiceChannel), 500)
    //   }
    // })

    await interaction.reply({
      content: 'a',
      ephemeral: true
    })
  }
})