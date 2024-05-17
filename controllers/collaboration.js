const knex = require('../db/knex');
const { errorResponse, successResponse } = require('../utils/responseHandlers'); // Utility functions for consistent responses


/**
 * Adds a new collaboration to the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const addCollaborator = async (req, res) => {
    try {
        const { collaboration, collaborator } = req.body;
        // Validate the input data
        if (!collaboration || !collaborator) {
            return errorResponse(res, 'Collaboration & collaborator are required', 400);
        }

        const existingCollaboration = await knex('collaborations').where({ collaboration }).first();

        if (existingCollaboration) {
            // Update the existing collaboration to add the new collaborator
            const collaborators = JSON.parse(existingCollaboration.collaborators || '[]');
            if (!collaborators.includes(collaborator)) {
                collaborators.push(collaborator);
            }

            await knex('collaborations')
                .where({ collaboration })
                .update({ collaborators: JSON.stringify(collaborators) });

            return { ...existingCollaboration, collaborators };
        } else {
            return errorResponse(res, 'Collaboration not found', 404);
        }

    } catch (error) {
        console.error('Error adding collaboration:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
};


/**
 * Adds a new collaboration to the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const getCollaboration = async (req, res) => {
    try {
        const { collaborator } = req.params;

        if (!collaborator) {
            return errorResponse(res, 'Collaborator is required', 400);
        }

        const collaborations = await knex('collaborations').whereLike('collaborators', collaborator);

        return successResponse(res, collaborations, 200);
    } catch (error) {
        console.error('Error getting collaboration:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
}

/**
 * Gets all collaborations from the database based on the query parameters
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const collaborations = async (req, res) => {
    try {
        const queryObject = req.query;


        const collaborationsQueryBuilder = knex('collaborations')

        if (queryObject.collaborator && /^0x[a-fA-F0-9]{40}$/.test(queryObject.collaborator)) {
            collaborationsQueryBuilder.whereILike('collaborators', `%${queryObject.collaborator}%`)
        } else if (queryObject.collaborator) {
            return errorResponse(res, 'Invalid address', 400);
        }

        if (queryObject.status && ['active', 'inactive'].includes(queryObject.status)) {
            collaborationsQueryBuilder.where('status', queryObject.status)
        }

        const collaborations = await collaborationsQueryBuilder.select('collaboration', 'image');

        return successResponse(res, collaborations, 200);
    } catch (error) {
        console.error('Error getting collaboration:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
};

/**
 * Adds a new collaboration to the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const getHolders = async (req, res) => {
    const { collaboration } = req.params;
    if (!collaboration) return errorResponse(res, 'Collaboration address required', 400);

    try {
        const holders = await knex('collaborations')
            .join('holdings', 'collaborations.collaboration', 'holdings.collaboration')
            .where({ 'holdings.collaboration': collaboration })
            .select('holder')
            .pluck('holder');
        return successResponse(res, holders, 200);
    } catch (error) {
        console.error('Error getting holders:', error);
        return errorResponse(res, 'Something went wrong! Please contact farhad@yusifli.com', 500);
    }
}


module.exports = {
    addCollaborator,
    getCollaboration,
    getHolders,
    collaborations
};
