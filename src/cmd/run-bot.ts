import { Telegraf } from "telegraf";
import pino from "pino";
import { database, handlers, repos } from "../bot";

const logger = pino();

const run = async () => {
  if (process.env.BOT_TOKEN) {
    const db = await database.make();
    const bot = new Telegraf(process.env.BOT_TOKEN);

    const userRepo = repos.user(db);

    bot.start(handlers.start());
    bot.command("barcode", handlers.barcode(userRepo));
    bot.on("text", handlers.text(userRepo));

    bot.launch();
  } else {
    logger.error("BOT_TOKEN is missing");
    process.exit(1);
  }
};

export default run;
