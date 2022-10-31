import { MessageActionRow, MessageButton } from "discord.js";
import { ApplicationCommandTypes } from "discord.js/typings/enums";
import { ContextCommand } from "../../structures/Command";

export default new ContextCommand({
  name: 'add-role-button',
  type: ApplicationCommandTypes.MESSAGE,

  run: ({interaction}) => {
    const message_id = interaction.targetId;
    const message_content = interaction.channel?.messages.fetch(message_id);

    message_content
      ?.then((msg: any) => { 
        const components_array = msg.components[0].components;
        const result = [new MessageActionRow({
          components: [
            ...components_array, new MessageButton({
              customId: `role`,
              label: `title`,
              style: "PRIMARY",
            })
          ]
        })]
        msg.edit({components: result});
      })
  }
})