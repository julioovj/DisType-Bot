import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
  name: "limpar",
  description: "[Moderação] Limpa mensagends do chat",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "[Moderação] Qual é o total de mensagens?",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  async run({ interaction, options }) {
    if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
      return;

    interaction.deferReply({ ephemeral: true });

    const quantidade = options.getInteger("quantidade", true);

    interaction.channel
      ?.bulkDelete(Math.min(quantidade, 100), true)
      .then((deletedMessages) => {
        interaction.editReply({
          content: `${deletedMessages.size} mensagens limpas`,
        });
      })
      .catch((reason) => {
        interaction.editReply({
          content: `Não foi possível deletar mensagens: \n${reason}`,
        });
      });
  },
});
