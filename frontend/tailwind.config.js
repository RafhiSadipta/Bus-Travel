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
                "dark-green": "#041922"
            },
            "spacing": {},
            "fontFamily": {
                "montserrat": "Montserrat"
            },
            "borderRadius": {
                "31xl": "50px",
                "81xl": "100px"
            }
        },
        "fontSize": {
            "base": "16px",
            "12xl": "28px",
            "13xl": "32px",
            "inherit": "inherit"
        }
    },
    "corePlugins": {
        "preflight": false
    }
}