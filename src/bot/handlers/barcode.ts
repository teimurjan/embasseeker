import { ChatState, User, UserRepo } from "../types";
import { MessageHandler } from "./types";

const barcode =
  (repo: UserRepo): MessageHandler =>
  (ctx) => {
    let user = repo.findByChatId(ctx.chat.id);

    if (user === null) {
      user = repo.create({
        chatId: ctx.chat.id,
        chatState: ChatState.WaitingForBarcode,
      })!;
    }

    return ctx.reply("Enter your barcode starting with AA00.");
  };

export default barcode;
