import * as path from "path";
import Loki from "lokijs";

export const make = (): Promise<Loki> =>
  new Promise((resolve, _reject) => {
    const file = path.resolve(__dirname, "main.db");
    const db = new Loki(file, {
      autoload: true,
      autoloadCallback: () => {
        const users = db.getCollection("users");
        if (users === null) {
          db.addCollection("users");
        }

        const slots = db.getCollection("slots");
        if (slots === null) {
          db.addCollection("slots");
        }

        resolve(db);
      },
      autosave: true,
      autosaveInterval: 4000,
    });
  });
