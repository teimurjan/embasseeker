export enum ChatState {
  Still = "still",
  WaitingForBarcode = "waitingForBarcode",
}

export type User = {
  chatId: number;
  chatState?: ChatState;
  barcode?: string;
};

export type Slot = {
  date: string;
};

export type UserRepo = {
  findByChatId: (chatId: number) => User | null;
  create: (user: User) => User | undefined;
  update: (user: User) => User;
  getWithBarcodes: () => User[];
};

export type SlotRepo = {
  getOne: () => Slot;
  updateOrCreate: (updates: Pick<Slot, "date">) => Slot | undefined;
};
