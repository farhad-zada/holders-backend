/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('holdings').del()
  await knex('holdings').insert([
    { collaboration: '0x00', holder: '0x01', token: '0x02', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x01', holder: '0x02', token: '0x03', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x02', holder: '0x03', token: '0x04', other: '', created_at: new Date(), updated_at: new Date() },
  ]);

};
