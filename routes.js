const express = require('express');
const router = express.Router();
const { addCollaboration, getCollaboration, getHolders } = require('./controllers/collaboration');
const { addHolding, getHoldings } = require('./controllers/holding');

// Collaborations
router.post('/collaboration', addCollaboration);
router.get('/collaboration/:collaborator', getCollaboration);
router.get('/collaboration/:collaboration/holders', getHolders);

// Holdings
router.post('/holding', addHolding);
router.get('/holding/:holder', getHoldings);

module.exports = router;
