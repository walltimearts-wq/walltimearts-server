const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactSchema } = require('../validations/contactValidation');
const validate = require('../middleware/validate');

// Public: anyone can send a contact message
router.post('/', validate(contactSchema), contactController.sendMessage);

module.exports = router;
