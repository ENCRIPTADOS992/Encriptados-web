import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "lg-custom": "1358px", // Nuevo breakpoint personalizado
      },
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"], // Fuente personalizada Roboto
      },     
      backgroundImage: {
        "cyan-gradient":
          "linear-gradient(360deg, rgba(211,245,255,1) 0%, rgba(244,248,250,1) 29%)",
        "cyan-black-gradient":
          "linear-gradient(150deg, rgba(0,0,0,1) 12%, rgba(53,205,251,1) 100%)",
        "red-black-gradient":
          "linear-gradient(170deg, rgba(0,0,0,1) 25%, rgba(209,24,39,1) 100%)",
        "custom-gradient-img":
          "linear-gradient(180deg, #def7ff 40%, transparent 60%)",
        "custom-gradient-our-sim-black":
          "linear-gradient(180deg, rgba(25,25,25,1) 72%, rgba(16,180,231,1) 100%)",
        "custom-gradient-our-sim-blue":
          "linear-gradient(180deg, #6ADDFF 72%, #A8EBFF 100%)",
        "custom-gradient-plans":
          "linear-gradient(90deg, rgba(168,235,255,1) 0%, rgba(106,221,255,1) 100%)",
        "custom-gradient-our-products-black":
          "linear-gradient(135deg, rgba(0,0,0,1) 40%, rgba(0,74,96,1) 100%)",
        "custom-gradient-qr-black-y-grey":
          "linear-gradient(90deg, #000000 40%, #272727 100%)",  
        "custom-gradient-secure-black-y-grey":
          "linear-gradient(270deg, #000000 50%, #272727 100%)",   
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [    
  ],
};

export default config;
