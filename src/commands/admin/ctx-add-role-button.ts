import { ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder } from "discord.js";
import { ApplicationCommandType, ButtonStyle, TextInputStyle } from "discord.js";
import isArrayElement from "../../lib/isArrayElement";
import RoleButtonId from "../../schemas/RoleButtonId";
import { ContextCommand } from "../../structures/Command";

export default new ContextCommand({
  name: 'add-role-button',
  defaultMemberPermissions: 'ManageRoles',
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
        .setLabel("Введите имя роли без символа <@>:")
        .setStyle(TextInputStyle.Short),
      title: new TextInputBuilder()
        .setCustomId('title')
        .setLabel("Введите текст который будет на кнопке:")
        .setStyle(TextInputStyle.Short),
        style: new TextInputBuilder()
        .setCustomId('style')
        .setLabel('Стиль нопки: Red | Green | Blue | Gray.')  
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
        const role = interaction.guild.roles.cache.find(role => role.name === `${name}`); 
        
        const ButtonStyles: ButtonStyle[] = [ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Primary, ButtonStyle.Danger];
        const AlternativeStyles: string[] = ['GREEN', 'GRAY', 'BLUE', 'RED'];
        
        if(isArrayElement(AlternativeStyles, style.toUpperCase())) {
          const final_style: ButtonStyle = ButtonStyles[AlternativeStyles.indexOf(style.toUpperCase())];
          const customId = `role_btn_${role.id}`;
          let db_id_array = [];
          const db_data = await (await RoleButtonId.find()).map(e => {
            db_id_array.push(e.button_id)
          });

        
        const components_array: any = message.components[0]
        
        const result: any = new ActionRowBuilder().addComponents(new ButtonBuilder({
          customId: customId,
          label: `${title}`,
          style: final_style,
        }), ...components_array.components);
        
        if(isArrayElement(db_id_array, customId)) console.log('Эта роль уже в бд.')    
        else {
          const newId = await RoleButtonId.create({
            button_id: customId
          });

          const savedId = await newId.save();
          return;
        }   
        
        message.edit({ components: [ result ] });
        
        await submitted.reply({
          content: 'Кнопка добавлена.',
          ephemeral: true
        })
      } else {
        await submitted.reply({
          content: `Стиля ${style.toUpperCase()} для кнопок нет.`,
          ephemeral: true
        });
      }
    }    
  }
})