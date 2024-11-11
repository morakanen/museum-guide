/** @type {import(tailwindcss'.Config)} */
export default{
    content: [
        "./React-frontend/src/**/*.{js,jsx,ts,tsx}", // Scans all files in src for Tailwind classes
        "./React-frontend/public/index.html",        // Scans the main HTML file
      ],
    theme:{
        extend:{},
},
    plugins:[require("@tailwindcss/typography"),require("daisyui")],
};