/**
 * @desc    Predefined store themes. Each preset contains colors + typography.
 *          The admin can apply a preset as-is or override individual values
 *          to make it custom. Keys of `colors` must match the Content model's
 *          theme.colors schema and themeValidation.js.
 *
 *          `default` mirrors the store's original brand (WallTimeArts
 *          espresso/brass palette) so applying it keeps the current look.
 */

const defaultColors = {
    primary: '#2B2118',      // Espresso charcoal
    primaryDark: '#1A130D',
    secondary: '#A9947A',    // Aged brass taupe
    accent: '#B7873F',       // Antique brass
    background: '#F7F1E8',   // Warm ivory
    surface: '#FFFFFF',
    border: '#E8DDCF',       // Parchment beige
    text: '#2B2118',
    textMuted: '#7A6A58',
    success: '#2E7D32',
    danger: '#C0392B',
    sage: '#9C6B30',         // Burnished brass (interactive highlights)
    earth: '#5B3C27'         // Walnut brown
};

const themePresets = {
    default: {
        name: 'Classic (Current Brand)',
        colors: defaultColors,
        typography: {
            fontFamily: "'Manrope', Arial, Helvetica, sans-serif",
            headingFont: "'Playfair Display', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '8px'
        }
    },
    midnight: {
        name: 'Midnight Dark',
        colors: {
            primary: '#7C6CF0',
            primaryDark: '#5A4BC4',
            secondary: '#9AA4B2',
            accent: '#22D3EE',
            background: '#0F1420',
            surface: '#1A2130',
            border: '#2A3346',
            text: '#E8EAF0',
            textMuted: '#9AA4B2',
            success: '#34D399',
            danger: '#F87171',
            sage: '#818CF8',
            earth: '#312E81'
        },
        typography: {
            fontFamily: "'Manrope', Arial, Helvetica, sans-serif",
            headingFont: "'Poppins', 'Segoe UI', sans-serif",
            baseFontSize: '16px',
            borderRadius: '12px'
        }
    },
    forest: {
        name: 'Forest Green',
        colors: {
            primary: '#1B4332',
            primaryDark: '#081C15',
            secondary: '#95D5B2',
            accent: '#D8A24A',
            background: '#F4F9F4',
            surface: '#FFFFFF',
            border: '#D3E4D5',
            text: '#1B2A20',
            textMuted: '#5C6F61',
            success: '#2D6A4F',
            danger: '#BC4749',
            sage: '#40916C',
            earth: '#386641'
        },
        typography: {
            fontFamily: "'Nunito', 'Segoe UI', sans-serif",
            headingFont: "'Playfair Display', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '10px'
        }
    },
    sunset: {
        name: 'Sunset Warm',
        colors: {
            primary: '#E2574C',
            primaryDark: '#B03A31',
            secondary: '#F4A261',
            accent: '#E9C46A',
            background: '#FFF8F2',
            surface: '#FFFFFF',
            border: '#F0DFD2',
            text: '#33272A',
            textMuted: '#7D6B6F',
            success: '#43AA8B',
            danger: '#BC4749',
            sage: '#E76F51',
            earth: '#9C4A2F'
        },
        typography: {
            fontFamily: "'Lato', 'Segoe UI', sans-serif",
            headingFont: "'Montserrat', 'Segoe UI', sans-serif",
            baseFontSize: '16px',
            borderRadius: '14px'
        }
    },
    royal: {
        name: 'Royal Luxe',
        colors: {
            primary: '#4338CA',
            primaryDark: '#312E81',
            secondary: '#C9A227',
            accent: '#E11D48',
            background: '#FAF9FF',
            surface: '#FFFFFF',
            border: '#E2E0F5',
            text: '#211D33',
            textMuted: '#6D6887',
            success: '#15803D',
            danger: '#BE123C',
            sage: '#7C3AED',
            earth: '#4C1D95'
        },
        typography: {
            fontFamily: "'Jost', 'Segoe UI', sans-serif",
            headingFont: "'Playfair Display', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '6px'
        }
    },
    mono: {
        name: 'Minimal Mono',
        colors: {
            primary: '#111111',
            primaryDark: '#000000',
            secondary: '#A3A3A3',
            accent: '#F97316',
            background: '#FFFFFF',
            surface: '#F7F7F7',
            border: '#E5E5E5',
            text: '#171717',
            textMuted: '#737373',
            success: '#22C55E',
            danger: '#EF4444',
            sage: '#525252',
            earth: '#262626'
        },
        typography: {
            fontFamily: "'Roboto', Arial, sans-serif",
            headingFont: "'Roboto', Arial, sans-serif",
            baseFontSize: '15px',
            borderRadius: '0px'
        }
    }
};

const themePresetIds = Object.keys(themePresets);

module.exports = { themePresets, themePresetIds, defaultColors };
