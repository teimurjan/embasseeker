import Loki from "lokijs";
import { Slot, SlotRepo } from "../types";

const Slot = (db: Loki): SlotRepo => ({
  getOne: () => {
    const collection = db.getCollection<Slot>("slots");
    return collection.data[0];
  },
  updateOrCreate: (newSlot: Slot) => {
    const collection = db.getCollection<Slot>("slots");
    const slot = collection.data[0];

    if (slot) {
      return collection.update({ ...slot, ...newSlot });
    } else {
      return collection.insertOne(newSlot);
    }
  },
});

export default Slot;
