/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    if (!(await knex.schema.hasTable('collaborations'))) {
        return knex.schema.createTable('collaborations', (table) => {
            table.increments('id');
            table.string('collaboration').notNullable().index().unique();
            table.json('collaborators').notNullable();
            table.json('tokens').notNullable();
            table.string('owner').notNullable();
            table.enum('status', ['active', 'paused', 'closed']).notNullable();
            table.string('image').nullable();
            table.string('other').nullable();
            table.timestamps(true, true);
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    if (await knex.schema.hasTable('collaborations'))
        return knex.schema.dropTable('collaborations')
};
