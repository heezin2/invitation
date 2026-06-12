/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: {
                    900: '#0d1424',
                    950: '#070b14',
                },
                gold: {
                    100: '#f7f4eb',
                    400: '#dfc082',
                    500: '#c6a052',
                }
            }
        },
    },
    plugins: [],
}