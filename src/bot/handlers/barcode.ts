import { ChatState, User, UserRepo } from "../types";
import { MessageHandler } from "./types";

const barcode =
  (repo: UserRepo): MessageHandler =>
  async (ctx) => {
    const user = await repo.findByChatId(ctx.chat.id);

    if (!user) {
      await repo.create({
        chat_id: ctx.chat.id,
        chat_state: ChatState.WaitingForBarcode,
      })!;
    } else {
      await repo.update({
        ...user,
        chat_state: ChatState.WaitingForBarcode,
      })!;
    }

    return ctx.reply("Enter your barcode starting with AA00.");
  };

export default barcode;
