const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { upload } = require('../services/fileUploadService');
const { themeUpdateSchema } = require('../validations/themeValidation');

// Theme routes (must be registered BEFORE '/:identifier' so 'theme' is not treated as an identifier)

// Public: storefront fetches the active theme
router.get('/theme', contentController.getTheme);

// Admin: presets list + apply/update theme
router.get('/theme/presets', protect, authorize('admin'), contentController.getThemePresets);
router.put('/theme', protect, authorize('admin'), validate(themeUpdateSchema), contentController.updateTheme);

// Public get
router.get('/:identifier', contentController.getContent);

// Admin update
// Using 'upload.any' for dynamic multiple image handling (slides, logo, impact, etc).
router.put('/:identifier', protect, authorize('admin'), upload.any(), contentController.updateContent);

module.exports = router;
