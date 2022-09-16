import { ChatState, UserRepo } from "../types";
import { TextHandler } from "./types";

const text =
  (repo: UserRepo): TextHandler =>
  async (ctx) => {
    const user = await repo.findByChatId(ctx.chat.id);

    if (user?.chat_state === ChatState.WaitingForBarcode) {
      const isBarcode = ctx.message.text.match(/^AA00[0-9A-z]*$/);
      if (isBarcode) {
        repo.update({
          ...user,
          chat_state: ChatState.Still,
          barcode: ctx.message.text,
        });
      } else {
        return ctx.reply("Invalid barcode format, try again. ❌");
      }

      return ctx.reply("Barcode is successfully saved. ✅");
    }

    return ctx.reply("I can only respond on barcode-related messages. 😅");
  };

export default text;
