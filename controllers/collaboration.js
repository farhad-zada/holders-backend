const knex = require('../db/knex');
const { errorResponse, successResponse } = require('../utils/responseHandlers'); // Utility functions for consistent responses

/**
 * Adds a new collaboration to the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const addCollaboration = async (req, res) => {
    try {
        const data = extractFields(req.body, ['collaboration', 'collaborator', 'token', 'status', 'other', 'image']);

        // Validate the input data
        if (!data.collaboration || !data.collaborator || !data.token) {
            return errorResponse(res, 'Collaboration, collaborator & token are required', 400);
        }

        // Check if the collaboration already exists
        const existingCollaboration = await knex('collaborations').where({ collaboration: data.collaboration }).first();

        if (existingCollaboration) {
            // Update the existing collaboration to add the new collaborator
            const collaborators = JSON.parse(existingCollaboration.collaborators || '[]');
            if (!collaborators.includes(data.collaborator)) {
                collaborators.push(data.collaborator);
            }

            await knex('collaborations')
                .where({ collaboration: data.collaboration })
                .update({ collaborators: JSON.stringify(collaborators) });

            return successResponse(res, { ...existingCollaboration, collaborators }, 200);
        } else {
            // Create a new collaboration with the initial collaborator
            const newCollaborationData = {
                collaboration: data.collaboration,
                collaborators: JSON.stringify([data.collaborator]),
                token: data.token,
                status: data.status,
                other: data.other,
                image: data.image
            };

            const [id] = await knex('collaborations').insert(newCollaborationData);
            const newCollaboration = await knex('collaborations').where({ id }).first();

            return successResponse(res, newCollaboration, 201);
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

        const collaborations = await knex('collaborations').whereRaw(`collaborators like '%${collaborator}%'`);

        return successResponse(res, collaborations, 200);
    } catch (error) {
        console.error('Error getting collaboration:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
}

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

const extractFields = (data, fields) => {
    return fields.reduce((acc, field) => {
        if (data[field]) {
            acc[field] = data[field];
        }
        return acc;
    }, {});
}

module.exports = {
    addCollaboration,
    getCollaboration,
    getHolders
};
