import { formatDate } from "../../utils";
import { SlotRepo } from "../types";
import { TextHandler } from "./types";

const getSlot =
  (repo: SlotRepo): TextHandler =>
  async (ctx) => {
    const slot = await repo.getOne();

    if (!slot) {
      return ctx.reply("There is no slot available. ❌");
    }

    return ctx.reply(
      `The first available slot for an interview is: <b>${formatDate(
        slot.date
      )}</b>.`,
      { parse_mode: "HTML" }
    );
  };

export default getSlot;
