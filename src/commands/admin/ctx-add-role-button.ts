import { MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent } from "discord.js";
import { ApplicationCommandTypes, MessageButtonStyles, TextInputStyles } from "discord.js/typings/enums";
import { ContextCommand } from "../../structures/Command";

export default new ContextCommand({
  name: 'add-role-button',
  type: ApplicationCommandTypes.MESSAGE,

  run: async ({ client, interaction }) => {
    const message_id = interaction.targetId;
    const message_content = interaction.channel?.messages.fetch(message_id);
    
    const modal = new Modal()
      .setCustomId('add-role')
      .setTitle('Modal for adding role button.');

    const fields = {
      name: new TextInputComponent()
        .setCustomId('roleNameInput')
        .setLabel("Enter role name here:")
        .setStyle(TextInputStyles.SHORT),
      title: new TextInputComponent()
        .setCustomId('buttonTitleInput')
        .setLabel("Enter buton title here:")
        .setStyle(TextInputStyles.SHORT),
      style: new TextInputComponent()
        .setCustomId('buttonStyleInput')
        .setLabel('Enter: Red | Green | Blue | Gray.')  
        .setStyle(TextInputStyles.SHORT),
    }
      
    const nameInput: any = new MessageActionRow().addComponents(fields.name);
    const titleInput: any = new MessageActionRow().addComponents(fields.title);
    const styleSelect: any = new MessageActionRow().addComponents(fields.style);
    modal.addComponents(nameInput, titleInput, styleSelect);
      

    await interaction.showModal(modal);
    
    const submitted = await interaction.awaitModalSubmit({time: 60000});
    if (submitted) {
      const [ name, title, style ] = Object.keys(fields).map(key => submitted.fields.getTextInputValue(fields[key].customId))
      
      const ButtonStyles: MessageButtonStyles[] = [MessageButtonStyles.SUCCESS, MessageButtonStyles.SECONDARY, MessageButtonStyles.PRIMARY, MessageButtonStyles.DANGER];
      const AlternativeStyles: string[] = ['GREEN', 'GRAY', 'BLUE', 'RED'];
      const final_style: any = ButtonStyles[AlternativeStyles.indexOf(style.toUpperCase())]

      message_content
      ?.then(async (msg: any) => { 
        const components_array: any[] = msg.components[0]?.components;

        if (components_array.length === 5) {
          await submitted.reply({
            content: 'Can not add more than 5 buttons.',
            ephemeral: true
          })
        } else {
          const result = [new MessageActionRow({
            components: [
              ...components_array,
               new MessageButton({
                customId: `${name}`,
                label: `${title}`,
                style: final_style,
              })
            ]
          })]
          msg.edit({components: result});
          
          await submitted.reply({
            content: 'Button added.',
            ephemeral: true
          })
        }
      })
    }
  }
})