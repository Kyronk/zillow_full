/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                "mani-50" : "#EDEFF6",
                "mani-100" : "#DBDFFC",
                "mani-200" : "#B7BFD9",
                "mani-300" : "#92A0C7",
                "mani-400" : "#6E80B4",
                "mani-500" : "#4A60A1",
                "mani-600" : "#3B4D81",
                "mani-700" : "#2C3A61",
                "mani-800" : "#1E2640",
                "mani-900" : "#0F1320"
            },
            colors : {
                "mani-50" : "#EDEFF6",
                "mani-100" : "#DBDFFC",
                "mani-200" : "#B7BFD9",
                "mani-300" : "#92A0C7",
                "mani-400" : "#6E80B4",
                "mani-500" : "#4A60A1",
                "mani-600" : "#3B4D81",
                "mani-700" : "#2C3A61",
                "mani-800" : "#1E2640",
                "mani-900" : "#0F1320"
            },
            width: {
                main: "1319px"
            }
        },
    },
    plugins: [],
}

