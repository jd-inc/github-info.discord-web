import { ActionRowBuilder, APIActionRowComponent, APIMessageActionRowComponent, ButtonBuilder, ModalBuilder, TextInputBuilder } from "discord.js";
import { ApplicationCommandType, ButtonStyle, TextInputStyle } from "discord.js";
import { ContextCommand } from "../../structures/Command";

export default new ContextCommand({
  name: 'add-role-button',
  type: ApplicationCommandType.Message,

  run: async ({ interaction }) => {
    const message_id = interaction.targetId;
    const message: any = await interaction.channel?.messages.fetch(message_id);
    
    const modal = new ModalBuilder()
      .setCustomId('add-role')
      .setTitle('Modal for adding role button.');

    const fields = {
      name: new TextInputBuilder()
        .setCustomId('name')
        .setLabel("Enter role name here:")
        .setStyle(TextInputStyle.Short),
      title: new TextInputBuilder()
        .setCustomId('title')
        .setLabel("Enter buton title here:")
        .setStyle(TextInputStyle.Short),
      style: new TextInputBuilder()
        .setCustomId('style')
        .setLabel('Enter: Red | Green | Blue | Gray.')  
        .setStyle(TextInputStyle.Short),
    }
      
    const nameInput: any = new ActionRowBuilder().addComponents(fields.name);
    const titleInput: any = new ActionRowBuilder().addComponents(fields.title);
    const styleSelect: any = new ActionRowBuilder().addComponents(fields.style);
    modal.addComponents(nameInput, titleInput, styleSelect);

    await interaction.showModal(modal);
    
    const submitted = await interaction.awaitModalSubmit({time: 60000});
    if (submitted) {
      const name  = submitted.fields.getTextInputValue('name');
      const title = submitted.fields.getTextInputValue('title');
      const style = submitted.fields.getTextInputValue('style');
      
      const ButtonStyles: ButtonStyle[] = [ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Primary, ButtonStyle.Danger];
      const AlternativeStyles: string[] = ['GREEN', 'GRAY', 'BLUE', 'RED'];
      const final_style: any = ButtonStyles[AlternativeStyles.indexOf(style.toUpperCase())]

      const components_array: any = message.components[0]

      const result: any = new ActionRowBuilder().addComponents(new ButtonBuilder({
        customId: `role_btn_${name}`,
        label: `${title}`,
        style: final_style,
      }), ...components_array.components)

      message.edit({ components: [ result ] });
      
      submitted.reply({
        content: 'Button added.',
        ephemeral: true
      })
      
      
    }    
  }
})