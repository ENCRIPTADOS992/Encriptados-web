import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "sm:w-[200px]",
    "md:w-[150px]",
    "md:min-w-[150px]",
    "md:max-w-[150px]",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "800px" },
        tablet: { min: "801px", max: "1369px" },
        desktop: { min: "1370px" },
        "xs": "375px",
        "lg-custom": "1358px",
        sm: '600px',
        md: '800px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        'promo': ['54px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['44px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['38px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['30px', { lineHeight: '1.4', fontWeight: '500' }],
        'h4': ['24px', { lineHeight: '1.5', fontWeight: '500' }],
        'h5': ['22px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      colors: {
        primary: '#0AAEE1',
        secondary: '#35CDFB',
        'text-primary': '#F7F7F7',
        'text-secondary': '#CCCCCC',
        'text-black': '#000000',
        'bg-secondary': '#161616',
        'bg-alternate': '#222222',
        'bg-alternate-2': '#032029',
        'stroke-border': '#3E3E3E',
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
        "custom-gradient-our-sim-blue2":
          "linear-gradient(140deg, #BDEFFF 0%, #FDFFFF 50%, #2CCDFF 100%)",
        "custom-gradient-plans":
          "linear-gradient(90deg, rgba(168,235,255,1) 0%, rgba(106,221,255,1) 100%)",
        "custom-gradient-our-products-black":
          "linear-gradient(135deg, #03212A 40%, #090909 70%)",
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
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};

export default config;
