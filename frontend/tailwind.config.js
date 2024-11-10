/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
        "./src/**/*.{js,jsx,ts,tsx,vue}"
    ],
    "theme": {
        "extend": {
            "colors": {
                "grey-60": "rgba(234, 234, 234, 0.6)",
                "grey": "rgba(234, 234, 234)",
                "dark-green-50": "rgba(4, 25, 34, 0.5)",
                "green": "#10cf93",
                "white": "#fff",
                "dark-green": "#041922",
                "pastel-yellow": "#f5d372",
                "green-20": "rgba(16, 207, 147, 0.2)",
                "pastel-red": "#f7665e",
                "white-30": "rgba(255, 255, 255, 0.7)",
            },
            "spacing": {},
            "fontFamily": {
                "montserrat": "Montserrat"
            },
            "borderRadius": {
                "31xl": "3.125rem", // 50px to rem
                "81xl": "6.25rem" // 100px to rem
            }
        },
        "fontSize": {
            "sm": "0.875rem", // 14px to rem
            "base": "1rem", // 16px to rem
            "lg": "1.5rem", // 24px to rem
            "12xl": "1.75rem", // 28px to rem
            "13xl": "2rem", // 32px to rem
            "inherit": "inherit"
        }
    },
    "corePlugins": {
        "preflight": false
    }
}
