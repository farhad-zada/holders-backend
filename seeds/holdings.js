/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('holdings').del()
  await knex('holdings').insert([
    { collaboration: '0x7C112Ad435F86D76D5Fe9EC3E8382d00505cFBCE', holder: '0xb7E5fcD08C08446742C9F4C0fa93C07E9E307443', token: '0x8E994009F038D5AB0B8f4321a6c0879c46F7A333', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x7C112Ad435F86D76D5Fe9EC3E8382d00505cFBCE', holder: '0x3418b859a9bAf14055E4F948a57c68Dfa295A000', token: '0x66D3eD28fF5d3dE43da345dead5c30bf17bfaaaA', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x42F891bd61d2537E5D48C81819b3e3fc6852ACcC', holder: '0x000000EEd287174A06550eabE6A00074255CaB34', token: '0xB1D7d6466d0Fb86766C119dF1967015e9bFF2e81', other: '', created_at: new Date(), updated_at: new Date() },
  ]);

};
