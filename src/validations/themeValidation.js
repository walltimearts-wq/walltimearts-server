const Joi = require('joi');
const { themePresetIds } = require('../constants/themePresets');

/**
 * @desc    Validation schema for store theme updates.
 *          Colors/typography are partial: the controller merges them with
 *          existing values, so every key is optional.
 */

// Hex color: #RGB, #RRGGBB or #RRGGBBAA
const hexColor = Joi.string()
    .pattern(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/)
    .message('Colors must be valid hex values like #2c5f2d');

const colorKeys = {
    primary: hexColor,
    primaryDark: hexColor,
    secondary: hexColor,
    accent: hexColor,
    background: hexColor,
    surface: hexColor,
    border: hexColor,
    text: hexColor,
    textMuted: hexColor,
    success: hexColor,
    danger: hexColor
};

const typographyKeys = {
    fontFamily: Joi.string().trim().max(200),
    headingFont: Joi.string().trim().max(200),
    baseFontSize: Joi.string().pattern(/^[0-9]+(px|rem|em)$/).message('baseFontSize must look like 16px or 1rem'),
    borderRadius: Joi.string().pattern(/^[0-9]+(px|rem|em)$/).message('borderRadius must look like 8px or 0.5rem')
};

const themeUpdateSchema = Joi.object({
    preset: Joi.string().valid(...themePresetIds).messages({
        'any.only': 'Unknown theme preset. Valid presets: {{#valids}}'
    }),
    isCustom: Joi.boolean(),
    colors: Joi.object(colorKeys).min(1),
    typography: Joi.object(typographyKeys).min(1)
}).min(1).messages({
    'object.min': 'Provide at least one of: preset, isCustom, colors or typography'
});

module.exports = { themeUpdateSchema };
