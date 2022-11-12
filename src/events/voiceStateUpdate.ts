import { ChannelType } from "discord.js";
import { client } from "../bot";
import { Event } from "../structures/Event";

export default new Event("voiceStateUpdate", async (oldState, newState: any) => {
  if (newState.id === client.user.id) return;
  const { member, guild } = newState;
  const newChannel = newState.channel;
  const oldChannel = oldState.channel;
  const parentChannel = '1014073028059074573';

  if(oldChannel !== newChannel && newChannel && newChannel.id === parentChannel) {
    const voiceChannel = await guild.channels.create({
      name: `${member.user.username}'s channel`, 
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
  const ownedChannel: string = client.voiceGenerator.get(member.id); 

  if(ownedChannel && oldChannel.id === ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
    client.voiceGenerator.set(member.id, null);    
    oldChannel.delete().catch(() => {})
  }
})