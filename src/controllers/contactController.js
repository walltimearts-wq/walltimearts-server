const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { sendContactEmail } = require('../services/emailService');

/**
 * @desc    Receive contact form message and forward it to the admin inbox via SMTP
 * @route   POST /api/contact
 * @access  Public
 */
exports.sendMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    await sendContactEmail({ name, email, subject, message });

    res.status(200).json(
        new ApiResponse(200, null, 'Your message has been sent. We will get back to you soon!')
    );
});
