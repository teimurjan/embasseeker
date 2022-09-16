import { ChatState, UserRepo } from "../types";
import { TextHandler } from "./types";

const text =
  (repo: UserRepo): TextHandler =>
  (ctx) => {
    const user = repo.findByChatId(ctx.chat.id);

    if (user?.chatState === ChatState.WaitingForBarcode) {
      const isBarcode = ctx.message.text.match(/^AA00[0-9A-z]*$/);
      if (isBarcode) {
        repo.update({
          ...user,
          chatState: ChatState.Still,
          barcode: ctx.message.text,
        });
      }

      return ctx.reply("Barcode is successfully saved. ✅");
    }

    return ctx.reply("I can only respond on barcode-related messages. 😅");
  };

export default text;
