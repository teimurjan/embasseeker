import { Telegraf } from "telegraf";
import pino from "pino";
import { config } from "dotenv";
import { database, handlers, repos } from "../bot";

config();

const logger = pino();

const run = async () => {
  if (process.env.BOT_TOKEN) {
    const db = await database.make();
    const bot = new Telegraf(process.env.BOT_TOKEN);

    const userRepo = repos.user(db);
    const slotRepo = repos.slot(db);

    bot.start(handlers.start());
    bot.command("barcode", handlers.barcode(userRepo));
    bot.command("reset_barcode", handlers.resetBarcode(userRepo));
    bot.command("get_slot", handlers.getSlot(slotRepo));
    bot.on("text", handlers.text(userRepo));

    const config =
      process.env.WEBHOOK_DOMAIN && process.env.PORT
        ? {
            webhook: {
              domain: process.env.WEBHOOK_DOMAIN,
              port: parseInt(process.env.PORT, 10),
            },
          }
        : undefined;

    bot.launch(config);
  } else {
    logger.error("BOT_TOKEN is missing");
    process.exit(1);
  }
};

run();
