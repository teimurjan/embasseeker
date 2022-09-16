import { Context, NarrowedContext } from "telegraf";
import { MountMap } from "telegraf/typings/telegram-types";

export type MessageHandler = (
  ctx: NarrowedContext<Context, MountMap["message"]>
) => void;
export type TextHandler = (
  ctx: NarrowedContext<Context, MountMap["text"]>
) => void;
