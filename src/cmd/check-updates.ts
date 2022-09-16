import { Telegraf } from "telegraf";
import pino from "pino";
import { database, repos } from "../bot";
import findDate from "./find-date";

const logger = pino();

const run = async (retryCount = 3): Promise<void> => {
  if (process.env.BOT_TOKEN) {
    try {
      const db = await database.make();
      const userRepo = repos.user(db);
      const slotRepo = repos.slot(db);

      const usersWithBarcode = userRepo.getWithBarcodes();
      if (!usersWithBarcode.length) {
        logger.info("There are no users with barcodes");
        process.exit(0);
      }

      const randomBarcode =
        usersWithBarcode[Math.floor(Math.random() * usersWithBarcode.length)]
          .barcode!;

      const bot = new Telegraf(process.env.BOT_TOKEN);
      const date = await findDate(randomBarcode);
      const formattedDate = date ? formatDate(date) : undefined;

      const slot = slotRepo.getOne();

      if (formattedDate && (!slot || slot.date !== formattedDate)) {
        slotRepo.updateOrCreate({
          date: formattedDate,
        });
        db.save();

        const messageText = `ℹ️ There is a new slot for interview available: ${formattedDate}.`;
        await Promise.all(
          usersWithBarcode.map((user) =>
            bot.telegram.sendMessage(user.chatId, messageText)
          )
        );

        logger.info(`A new interview date found: ${formattedDate}`);
      } else {
        logger.info("No new interview date found");
      }

      process.exit(0);
    } catch (error) {
      logger.error(error);

      if (retryCount > 0) {
        logger.info("Retry to check the updates");
        retryCount--;
        return await run(retryCount);
      } else {
        logger.info("Couldn't get the updates");
        process.exit(1);
      }
    }
  } else {
    logger.error("BOT_TOKEN is missing");
    process.exit(1);
  }
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(".");
}

export default run;
