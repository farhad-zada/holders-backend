/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('collaborations').del()
  await knex('collaborations').insert([
    { collaboration: '0x7C112Ad435F86D76D5Fe9EC3E8382d00505cFBCE', owner: '0xb4c694432F07560AE0FeD05151A7546Dd3d923b7', collaborators: JSON.stringify(['0xD1d6bF74282782B0b3eb1413c901D6eCF02e8e28']), tokens: JSON.stringify(['0x8E994009F038D5AB0B8f4321a6c0879c46F7A333', '0x66D3eD28fF5d3dE43da345dead5c30bf17bfaaaA']), status: 'active', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x42F891bd61d2537E5D48C81819b3e3fc6852ACcC', owner: '0xb86d5A0aF7f58BD00D73F1FBc1652B350669bC2A', collaborators: JSON.stringify(['0xEc3583b8A2D235CB14Ae8f9EB8cB13caEFe9A999']), tokens: JSON.stringify(['0x66D3eD28fF5d3dE43da345dead5c30bf17bfaaaA', '0xEc3583b8A2D235CB14Ae8f9EB8cB13caEFe9A999']), status: 'paused', other: '', created_at: new Date(), updated_at: new Date() },
    { collaboration: '0x000000EEd287174A06550eabE6A00074255CaB34', owner: '0x006b4863301b56376dD7078608eCAb88A17182f1', collaborators: JSON.stringify(['0xD3eB2E00Aa6D118627F9676a0c9513e8e42d6595']), tokens: JSON.stringify(['0xEc3583b8A2D235CB14Ae8f9EB8cB13caEFe9A999', '0xE37e799D5077682FA0a244D46E5649F71457BD09']), status: 'closed', other: '', created_at: new Date(), updated_at: new Date() },
  ]);
};
