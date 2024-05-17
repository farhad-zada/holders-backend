const knex = require('../db/knex');
const { errorResponse, successResponse } = require('../utils/responseHandlers'); // Utility functions for consistent responses
const { exec } = require('child_process');

/**
 * Deploys new contract to the blockchain.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const deploy = async (req, res) => {
    try {
        let { title, levels, tokens, startsAt, endsAt, signature } = req.body;

        levels = JSON.stringify(levels);
        tokens = JSON.stringify(tokens);
        startsAt = startsAt * 1;
        endsAt = endsAt * 1;

        const command = `SIGNATURE=${signature} TITLE=${title} LEVELS='${levels}' TOKENS='${tokens}' STARTS_AT='${startsAt}' ENDS_AT='${endsAt}' npx hardhat run scripts/deploy.holders.js --network hardhat`;

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error('Error deploying contract:', error);
                return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
            }
            if (stdout)
                console.log(`stdout: ${stdout}`);
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
            }


            const result = JSON.parse(stdout);
            const newCollaboration = await createCollaboration(result.collaborations, result.owner, tokens, 'active', null, null);
            return successResponse(res, newCollaboration, 200);
        }
        );
    } catch (error) {
        console.error('Error deploying contract:', error);
        return errorResponse(res, "Something went wrong! Please contact farhad@yusifli.com", 500);
    }
}

const createCollaboration = async (collaboration, collaborator, tokens, status, other, image) => {
    try {
        tokens = JSON.parse(tokens).map(token => token[0]);
        const newCollaborationData = {
            collaboration,
            collaborators: JSON.stringify([collaborator]),
            tokens: JSON.stringify(tokens),
            owner: collaborator,
            status,
            other,
            image
        };

        const [id] = await knex('collaborations').insert(newCollaborationData);
        const result = await knex('collaborations').where({ id }).first();
        result.collaborators = JSON.parse(result.collaborators);
        result.tokens = JSON.parse(result.tokens);
        return result;
    } catch (error) {
        console.error('Error creating collaboration:', error);
        throw new Error("Something went wrong! Please contact farhad@yusifli.com for help!");
    }
};



const validate = (req, res, next) => {
    let { levels, tokens, startsAt, endsAt } = req.body;

    switch (true) {
        case !levels:
            return errorResponse(res, 'Levels is required', 400);
        case !tokens:
            return errorResponse(res, 'Tokens is required', 400);
        case !startsAt:
            return errorResponse(res, 'startsAt is required', 400);
        case !endsAt:
            return errorResponse(res, 'endsAt is required', 400);
        case !Array.isArray(levels):
            return errorResponse(res, 'Levels must be an array', 400);
        case !Array.isArray(tokens):
            return errorResponse(res, 'Tokens must be an array', 400);
        case typeof startsAt !== 'number':
            return errorResponse(res, 'startsAt must be a number', 400);
        case typeof endsAt !== 'number':
            return errorResponse(res, 'endsAt must be a number', 400);
        default:
            next();

    }
}


module.exports = {
    deploy,
    validate
}