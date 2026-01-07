import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // Primary Palette from Styling Guide
                'primary': '#8B7BB5',       // Primary Violet
                'primary-foreground': '#FFFFFF',
                'violet-light': '#A99BD4',
                'violet-dark': '#6B5B95',
                'lavender': '#C4B5E0',

                // Backgrounds - Dark Theme for Space
                'bg-primary': '#0a0a0f',    // Deep Space Dark
                'bg-secondary': '#111118',
                'bg-card': 'rgba(255, 255, 255, 0.03)',
                'bg-card-hover': 'rgba(255, 255, 255, 0.06)',

                // Text Colors
                'text-primary': '#EAEAEA',
                'text-secondary': 'rgba(234, 234, 234, 0.75)',
                'text-muted': 'rgba(234, 234, 234, 0.5)',

                // Legacy Mappings
                'rose': '#8B7BB5',
                'gold': '#8B7BB5',
                'gold-light': '#A99BD4',
            },
            fontFamily: {
                'display': ['"Sora"', 'sans-serif'],
                'sans': ['"Inter"', 'sans-serif'],
                'mono': ['"JetBrains Mono"', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    darkMode: "class",
    plugins: [heroui()],
}
