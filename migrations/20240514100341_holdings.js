/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    if (!(await knex.schema.hasTable('holdings'))) {
        return knex.schema.createTable('holdings', (table) => {
            table.increments('id');
            table.string('collaboration').notNullable();
            table.string('holder').notNullable();
            table.string('token').notNullable();
            table.string('other').nullable();

            table.foreign('collaboration').references('collaboration').inTable('collaborations');
            table.timestamps(true, true);
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    if (await knex.schema.hasTable('holdings')) return knex.schema.dropTable('holdings');
};
