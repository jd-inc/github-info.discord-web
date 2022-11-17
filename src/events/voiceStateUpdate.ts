import { ChannelType } from "discord.js";
import { client } from "../bot";
import AutoVoices from "../schemas/AutoVoices";
import { Event } from "../structures/Event";

export default new Event("voiceStateUpdate", async (oldState, newState) => {
  const data = await AutoVoices.find();
  if (!data) return;
  // console.log(data[0].channel_id);
  

  if (newState.channel.id == data[0].channel_id) {
    const { guild, user, voice, id } = newState.member;

    const parent = newState.channel.parentId;
    const parentID = parent 
      ? { parent }
      : { };

    const voiceChannel = await guild.channels.create({
      name: 'a',
      type: ChannelType.GuildVoice,
      ...parentID,
      permissionOverwrites: [
        {
          id: id,
          allow: [ "Speak", "Stream" ]
        },
        {
          id: guild.id,
          deny: [ "Connect" ]
        }
      ]
    })

    client.voiceGenerator.set(voiceChannel.id, newState.member.id);
    voice.setChannel(voiceChannel.id);
  }

  if ( client.voiceGenerator.get(oldState.channelId) && oldState.channel.members.size === 0 ) {
    oldState.channel.delete().catch(() => {})
    return;
  }   
})