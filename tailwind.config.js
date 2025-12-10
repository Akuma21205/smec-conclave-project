/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gold': '#d4a853',
                'gold-light': '#f4d794',
                'bg-primary': '#0a0a12',
                'bg-card': 'rgba(20, 20, 35, 0.6)',
            },
            fontFamily: {
                'display': ['"Playfair Display"', 'serif'],
                'sans': ['"Outfit"', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
            }
        },
    },
    plugins: [],
}
