import { UserRepo } from "../types";
import { MessageHandler } from "./types";

const resetBarcode =
  (repo: UserRepo): MessageHandler =>
  async (ctx) => {
    const user = await repo.findByChatId(ctx.chat.id);

    if (user) {
      await repo.update({
        ...user,
        barcode: null,
      })!;
    }

    return ctx.reply("Your barcode has been cleared. 🧹");
  };

export default resetBarcode;
