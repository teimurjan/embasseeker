import { Sql } from "postgres";

export enum ChatState {
  Still = "still",
  WaitingForBarcode = "waiting_for_barcode",
}

export type User = {
  chat_id: number;
  chat_state?: ChatState;
  barcode?: string | null;
};

export type Slot = {
  date: Date;
};

export type UserRepo = {
  findByChatId: (chatId: number) => Promise<User | undefined>;
  create: (user: User) => Promise<User | undefined>;
  update: (user: User) => Promise<User>;
  getWithBarcodes: () => Promise<User[]>;
};

export type SlotRepo = {
  getOne: () => Promise<Slot | undefined>;
  updateOrCreate: (newSlot: Slot) => Promise<Slot | undefined>;
};

export type DB = Sql<User | Slot>;
