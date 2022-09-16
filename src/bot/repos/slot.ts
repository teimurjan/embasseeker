import { DB, Slot, SlotRepo } from "../types";

const slot = (db: DB): SlotRepo => {
  const getOne = async () => {
    const slots = await db<Slot[]>`
      select date
      from slots
    `;

    return slots.length ? slots[0] : undefined;
  };

  return {
    getOne,
    updateOrCreate: async (newSlot: Slot) => {
      const slot = await getOne();

      if (slot) {
        return (
          await db<Slot[]>`
            update slots
            set date=${newSlot.date}
            returning *
          `
        )[0];
      }

      return (
        await db<Slot[]>`
          insert into slots(date)
          values(${newSlot.date})
          returning *
        `
      )[0];
    },
  };
};

export default slot;
