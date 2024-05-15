const knex = require('../db/knex');
const { errorResponse, successResponse } = require('../utils/responseHandlers'); // Utility functions for consistent responses
const { exec } = require('child_process');

/**
 * Deploys new contract to the blockchain.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const deploy = async (req, res) => {
    let { levels, tokens, startsAt, endsAt } = req.body;

    levels = JSON.stringify(levels);
    tokens = JSON.stringify(tokens);
    startsAt = startsAt * 1;
    endsAt = endsAt * 1;

    const command = `LEVELS='${levels}' TOKENS='${tokens}' STARTS_AT='${startsAt}' ENDS_AT='${endsAt}' npx hardhat run scripts/deploy.holders.js --network hardhat`;

    exec(command, (error, stdout, stderr) => {
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
        return successResponse(res, stdout.trim(), 200);
    }
    );
}


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
        case levels.length !== tokens.length:
            return errorResponse(res, 'Levels and tokens must have the same length', 400);
        case !levels.every(l => typeof l === 'number'):
            return errorResponse(res, 'Levels must be numbers', 400);
        case !tokens.every(t => typeof t === 'string'):
            return errorResponse(res, 'Tokens must be strings', 400);
        case typeof startsAt !== 'number':
            return errorResponse(res, 'startsAt must be a number', 400);
        case typeof endsAt !== 'number':
            return errorResponse(res, 'endsAt must be a number', 400);
        default:
            next();

    }
}


module.exports = {
    deploy
}