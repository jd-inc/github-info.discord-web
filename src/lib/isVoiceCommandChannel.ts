import isArrayElement from "./isArrayElement";

export default function isVoiceCommandChannel(currentChannelId: string, specialChannelsIds: string[]): boolean {
  const isTrue: boolean = isArrayElement(specialChannelsIds, currentChannelId);
  
  return isTrue;
}