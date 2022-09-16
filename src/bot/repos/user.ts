import { User, UserRepo, DB } from "../types";

const user = (db: DB): UserRepo => ({
  findByChatId: async (chatId: number) => {
    const users = await db<User[]>`
      select chat_id, chat_state, barcode
      from users
      where chat_id=${chatId}
    `;

    return users.length ? users[0] : undefined;
  },
  create: async (user: User) => {
    const [newUser] = await db<User[]>`
      insert into users(chat_id, chat_state)
      values(${user.chat_id}, ${user.chat_state ?? null})
      returning *
    `;

    return newUser;
  },
  update: async (user: User) => {
    await db`
      update users
      set barcode=${user.barcode ?? null}, chat_state=${user.chat_state ?? null}
      where chat_id=${user.chat_id}
      returning *
    `;

    return user;
  },
  getWithBarcodes: async () => {
    const users = await db<User[]>`
      select chat_id, chat_state, barcode
      from users
      where barcode is not null
    `;

    return users;
  },
});

export default user;
