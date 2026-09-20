const Joi = require('joi');

exports.contactSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
        .messages({ 'string.empty': 'Name is required' }),
    email: Joi.string().email().required()
        .messages({ 'string.empty': 'Email is required', 'string.email': 'Please provide a valid email' }),
    subject: Joi.string().trim().min(2).max(150).required()
        .messages({ 'string.empty': 'Subject is required' }),
    message: Joi.string().trim().min(5).max(2000).required()
        .messages({ 'string.empty': 'Message is required' })
});
