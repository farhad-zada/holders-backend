const knex = require('../db/knex');
const { errorResponse, successResponse } = require('../utils/responseHandlers'); // Utility functions for consistent responses


/**
 * Adds a new holding to the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */

const addHolding = async (req, res) => {
    const { collaboration, token, holder, other } = req.body;

    if (!collaboration || !token || !holder) {
        return errorResponse(res, 'Collaboration, token & holder are required', 400);
    }

    if (await knex('collaborations').where({ collaboration, token }).first() === undefined) {
        return errorResponse(res, 'Collaboration does not exist', 400);
    }

    const existingHolding = await knex('holdings').where({ collaboration, token, holder }).first();
    if (existingHolding) {
        return errorResponse(res, 'Holding already exists', 400);
    }
    try {
        const [id] = await knex('holdings').insert({
            collaboration,
            token,
            holder,
            other
        });
        const newHolding = await knex('holdings').where({ id }).first();
        return successResponse(res, newHolding, 201);
    } catch (error) {
        console.error('Error adding holding:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
}

const getHoldings = async (req, res) => {
    try {
        const { holder } = req.params;
        if (!holder) {
            return errorResponse(res, 'Holder is required', 400);
        }
        const holdings = await knex('holdings')
            .where({ holder })
            .select('collaboration')
            .pluck('collaboration');
        return successResponse(res, holdings, 200);
    } catch (error) {
        console.error('Error getting holdings:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
}
module.exports = {
    addHolding,
    getHoldings
}