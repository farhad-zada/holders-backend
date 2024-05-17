const express = require('express');
const router = express.Router();
const { addCollaboration, getCollaboration, getHolders, collaborations } = require('./controllers/collaboration');
const { addHolding, getHoldings } = require('./controllers/holding');
const { deploy } = require('./controllers/deployer');

// Deployer
router.post('/deploy', deploy);

// Collaborations
router.post('/collaboration', addCollaboration);
router.get('/collaborations', collaborations);
router.get('/collaboration/:collaborator', getCollaboration);
router.get('/collaboration/:collaboration/holders', getHolders);

// Holdings
router.post('/holding', addHolding);
router.get('/holding/:holder', getHoldings);

module.exports = router;

