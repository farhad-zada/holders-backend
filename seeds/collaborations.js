/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('collaborations').del()
  await knex('collaborations').insert([
    { collaboration: '0x00', collaborators: JSON.stringify(['0x01']), token: '0x02', status: 'active', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x01', collaborators: JSON.stringify(['0x02']), token: '0x03', status: 'paused', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x02', collaborators: JSON.stringify(['0x03']), token: '0x04', status: 'closed', other: '', created_at: new Date(), updated_at: new Date() },
  ]);
};
