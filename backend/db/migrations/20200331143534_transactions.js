exports.up = function (knex) {
  return knex.schema.createTable("transactions", table => {
    table.increments(),
      table.string("text").notNull().default(""),
      table.decimal("amount").notNull().default(0.0),
      table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
