/** Dark red for readable text on blush/cream primaries (#FFF9F5, #f6dadf); replaces pink-as-text when needed */
export const TEXT_ON_PRIMARY_BG = '#7f1d1d'

// Theme Configuration - Soft Romantic Pastel
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-[#FFF9F5]',
        secondary: 'bg-[#FFD6C2]',
        accent: 'bg-[#DCC6F2]',
        light: 'bg-[#FFFFFF]/70',
        theme: 'bg-[#FFFFFF]',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-[#7f1d1d]',
        secondary: 'text-[#6A6075]',
        accent: 'text-[#A9758A]',
        muted: 'text-[#DCC6F2]',
        dark: 'text-[#7f1d1d]',
        theme: 'text-[#A9758A]',
        pause: 'text-[#FFFFFF]',
        custom: 'text-[#7f1d1d]',
    },

    // Border Colors
    borders: {
        primary: 'border-[#f6dadf]',
        secondary: 'border-[#f6dadf]',
        accent: 'border-[#DCC6F2]',
        theme: 'border-[#E3ADC3]',
    },

    // Button Colors
    buttons: {
        primary: 'bg-[#f6dadf] hover:bg-[#E3ADC3]',
        secondary: 'border border-[#f6dadf] hover:border-[#E3ADC3]',
        text: 'text-[#4B4453] hover:text-[#4B4453]',
        theme: 'bg-[#f6dadf] hover:bg-[#E3ADC3]',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-[#E3ADC3]',
        secondary: 'hover:border-[#E3ADC3] hover:text-[#7f1d1d]',
        theme: 'hover:bg-[#E3ADC3]',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-06-13',
        highlightColor: 'bg-[#FFF9F5]',
        heartColor: 'text-[#A9758A]',
        textColor: 'text-[#7f1d1d]',
        headerColor: 'text-[#7f1d1d]',
        dayNamesColor: 'text-[#7f1d1d]/95',
        background: 'bg-[#f6dadf]',
    },

    // Custom CSS Variables
    cssVariables: {
        '--primary-bg': '#f6dadf',
        '--secondary-bg': '#FFD6C2',
        '--accent-bg': '#DCC6F2',
        '--primary-text': '#7f1d1d',
        '--secondary-text': '#6A6075',
        '--accent-text': '#A9758A',
        '--muted-text': '#DCC6F2',
        '--border-color': '#E3ADC3',
        '--custom-theme': '#FFF9F5',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-wedding-600',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-wedding-600',
        }
    },
    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },
    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    }
}

export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
