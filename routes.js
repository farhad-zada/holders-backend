const express = require('express');
const router = express.Router();
const { getCollaboration, getHolders, collaborations, addCollaborator } = require('./controllers/collaboration');
const { addHolding, getHoldings } = require('./controllers/holding');
const { deploy, validate } = require('./controllers/deployer');

// Deployer
router.post('/deploy', validate, deploy);

// Collaborations
router.post('/collaboration', addCollaborator);
router.get('/collaborations', collaborations);
router.get('/collaboration/:collaborator', getCollaboration);
router.get('/collaboration/:collaboration/holders', getHolders);

// Holdings
router.post('/holding', addHolding);
router.get('/holding/:holder', getHoldings);

module.exports = router;

