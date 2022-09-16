/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    chat_id: "id",
    chat_state: { type: 'varchar(256)', notNull: false },
    barcode: { type: "varchar(256)", notNull: false },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("slots", {
    id: "id",
    date: { type: "timestamp", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("slots");
  pgm.dropTable("users");
};
