import Loki from "lokijs";
import { User, UserRepo } from "../types";

const user = (db: Loki): UserRepo => ({
  findByChatId: (chatId: number) =>
    db.getCollection<User>("user").findOne({ chatId }),
  create: (user: User) => db.getCollection<User>("user").insertOne(user),
  update: (user: User) => db.getCollection<User>("user").update(user),
  getWithBarcodes: () =>
    db.getCollection<User>("users").where((user) => !!user.barcode),
});

export default user;
