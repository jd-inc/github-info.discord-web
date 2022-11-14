import { ChannelType } from "discord.js";
import { client } from "../bot";
import { Event } from "../structures/Event";

export default new Event("voiceStateUpdate", async (oldState, newState) => {
  if (newState.id === client.user.id) return;
  const { member, guild } = newState;
  const newChannel = newState.channel;
  const oldChannel = oldState.channel;
  const parentCloseChannel = guild.channels.cache.find(channel => channel.name === `🔒 Создать комнату`);
  const parentOpenChannel = guild.channels.cache.find(channel => channel.name === `🔓 Создать комнату`);

  if(oldChannel !== newChannel && newChannel && newChannel.id === parentOpenChannel.id) {
    const voiceChannel = await guild.channels.create({
      name: `🔓 ${member.user.username}'s channel`, 
      type: ChannelType.GuildVoice,
      parent: newChannel.parent,
      permissionOverwrites: [
        {id: member.id, allow: ["Connect"]},
        {id: guild.id, allow : ["Connect"]}
      ]
    })

    client.voiceGenerator.set(guild.id, voiceChannel.id);

    await newChannel.permissionOverwrites.edit(member, {Connect: false});
    setTimeout(() => {
      newChannel.permissionOverwrites.delete(member)
    }, 30 * 1000);

    return setTimeout(() => {
      member.voice.setChannel(voiceChannel);
    }, 500);
  }
  const ownedOpenChannel: string = client.voiceGenerator.get(guild.id); 

  if(ownedOpenChannel && oldChannel.id === ownedOpenChannel && (!newChannel || newChannel.id !== ownedOpenChannel)) {
    client.voiceGenerator.set(member.id, null);    
    oldChannel.delete().catch(() => {})
  }

  if(oldChannel !== newChannel && newChannel && newChannel.id === parentCloseChannel.id) {
    const voiceChannel = await guild.channels.create({
      name: `🔒 ${member.user.username}'s channel`, 
      type: ChannelType.GuildVoice,
      parent: newChannel.parent,
      permissionOverwrites: [
        {id: member.id, allow: ["Connect"]},
        {id: guild.id, deny : ["Connect"]}
      ]
    })

    client.voiceGenerator.set(member.id, voiceChannel.id);

    await newChannel.permissionOverwrites.edit(member, {Connect: false});
    setTimeout(() => {
      newChannel.permissionOverwrites.delete(member)
    }, 30 * 1000);

    return setTimeout(() => {
      member.voice.setChannel(voiceChannel);
    }, 500);
  }
  const ownedCloseChannel: string = client.voiceGenerator.get(member.id); 

  if(ownedCloseChannel && oldChannel.id === ownedCloseChannel && (!newChannel || newChannel.id !== ownedCloseChannel)) {
    client.voiceGenerator.set(member.id, null);    
    oldChannel.delete().catch(() => {})
  }
})