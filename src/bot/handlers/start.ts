import { MessageHandler } from "./types";

const start = (): MessageHandler => (ctx) => {
  ctx.reply(
    "Hi there! 👋\n\nI'm a bot that will notify you about the free appointment slots in the US Embassy (Kyrgyzstan 🇰🇬).\n\nStart by setting your /barcode."
  );
};

export default start;
