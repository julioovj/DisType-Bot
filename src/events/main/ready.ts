import { client } from "../..";
import { Event } from "../../structs/types/Event";

export default new Event({
  name: "ready",
  once: true,
  run() {
    const { commands, buttons, selects, modals } = client;

    console.log("✅ Bot Online".green);
    console.log(
      `👀 Comandos: ${commands.size} | Botões: ${buttons.size} | Seletores: ${selects.size} | Modal: ${modals.size}`
        .cyan
    );
  },
});
