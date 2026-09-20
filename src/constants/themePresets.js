/**
 * @desc    Predefined store themes. Each preset contains colors + typography.
 *          The admin can apply a preset as-is or override individual values
 *          to make it custom. Keys of `colors` must match the Content model's
 *          theme.colors schema and themeValidation.js.
 */

const themePresets = {
    default: {
        name: 'Default Light',
        colors: {
            primary: '#2c5f2d',
            primaryDark: '#1e3f1f',
            secondary: '#c8a97e',
            accent: '#e67e22',
            background: '#fdfaf5',
            surface: '#ffffff',
            border: '#e5e0d8',
            text: '#2b2b2b',
            textMuted: '#6b6b6b',
            success: '#2e7d32',
            danger: '#c0392b'
        },
        typography: {
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            headingFont: "'Playfair Display', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '8px'
        }
    },
    midnight: {
        name: 'Midnight Dark',
        colors: {
            primary: '#7c6cf0',
            primaryDark: '#5a4bc4',
            secondary: '#9aa4b2',
            accent: '#22d3ee',
            background: '#0f1420',
            surface: '#1a2130',
            border: '#2a3346',
            text: '#e8eaf0',
            textMuted: '#9aa4b2',
            success: '#34d399',
            danger: '#f87171'
        },
        typography: {
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            headingFont: "'Poppins', 'Segoe UI', sans-serif",
            baseFontSize: '16px',
            borderRadius: '12px'
        }
    },
    forest: {
        name: 'Forest Green',
        colors: {
            primary: '#1b4332',
            primaryDark: '#081c15',
            secondary: '#95d5b2',
            accent: '#d8a24a',
            background: '#f4f9f4',
            surface: '#ffffff',
            border: '#d3e4d5',
            text: '#1b2a20',
            textMuted: '#5c6f61',
            success: '#2d6a4f',
            danger: '#bc4749'
        },
        typography: {
            fontFamily: "'Nunito', 'Segoe UI', sans-serif",
            headingFont: "'Merriweather', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '10px'
        }
    },
    sunset: {
        name: 'Sunset Warm',
        colors: {
            primary: '#e2574c',
            primaryDark: '#b03a31',
            secondary: '#f4a261',
            accent: '#e9c46a',
            background: '#fff8f2',
            surface: '#ffffff',
            border: '#f0dfd2',
            text: '#33272a',
            textMuted: '#7d6b6f',
            success: '#43aa8b',
            danger: '#bc4749'
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
            primary: '#4338ca',
            primaryDark: '#312e81',
            secondary: '#c9a227',
            accent: '#e11d48',
            background: '#faf9ff',
            surface: '#ffffff',
            border: '#e2e0f5',
            text: '#211d33',
            textMuted: '#6d6887',
            success: '#15803d',
            danger: '#be123c'
        },
        typography: {
            fontFamily: "'Jost', 'Segoe UI', sans-serif",
            headingFont: "'Cormorant Garamond', Georgia, serif",
            baseFontSize: '16px',
            borderRadius: '6px'
        }
    },
    mono: {
        name: 'Minimal Mono',
        colors: {
            primary: '#111111',
            primaryDark: '#000000',
            secondary: '#a3a3a3',
            accent: '#f97316',
            background: '#ffffff',
            surface: '#f7f7f7',
            border: '#e5e5e5',
            text: '#171717',
            textMuted: '#737373',
            success: '#22c55e',
            danger: '#ef4444'
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

module.exports = { themePresets, themePresetIds };
