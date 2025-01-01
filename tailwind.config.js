/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{tsx,ts}",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    // screens: {
    //   "xs": ""
    // },
    extend: {
      screens: {
        "xs": "450px",
        "3xl": "1800px",
      },
      colors: {
        "primary": "rgba(233, 69, 208, 1)",
        "th-gray": "rgba(242, 228, 241, 1)",
        "th-gray-2": "rgba(242, 228, 241, 1)",
        "th-green-3": "#6FCF97",
        "th-green": "#7CE69A",
        "dark": "#1E162E",
        "body": "#F2E4F1",
        "input":"rgba(6, 18, 32, 0.2)"
      },
      backdropGrayscale: {
        "input": "rgba(6, 18, 32, 0.1)",
      },
      fontFamily: {
        "nebula": "Nebula",
        "jakarta": "Plus Jakarta Sans, sans-serif",
        'Inter': "sans- serif"
    },
    backgroundImage: {
      'gr-purple': "linear-gradient(90deg, rgba(56, 28, 77, 0.8) 0%, rgba(31, 7, 30, 0.8) 100%)",
      'gr-purple-light': "linear-gradient(206.04deg, #6F40B0 -0.61%, #1E162E 57.68%)",
      'gr-purple-dark': "linear-gradient(90deg, #381C4D 0%, #1F071E 100%)",
      'radial-gr-purple': "radial-gradient(116.32% 95.63% at 76.68% 66.67%, rgba(233, 69, 208, 0) 0%, rgba(233, 69, 208, 0.5) 100%)",
      "primary-image": "url(/images/theme-bg.jpg)",
      "primary-image-mobile": "url(/images/theme-bg-mobile.png)",
    },
    backdropBlur: {
      'gr-purple': "blur(10px)"
    },
    borderRadius: {
      '20': "20px",
      '10': "10px",
    },
    backgroundPosition: {
      "primary-image": "center",
      "primary-image-mobile": "center",
    },
    backgroundSize: {
      "primary-image": "cover",
      "primary-image-mobile": "cover",
    },
    boxShadow: {
      "navigation-item": "0px 10px 30px #E945D0",
      "primary-btn": "0px 10px 30px #E945D0",
      "primary-btn-lg": "0px 10px 50px #E945D0",
      "dark-8px": "inset 0px -1px 8px #9375B6, inset 0px 0px 5px #FFACE4",
      "primary-tabs": "0px 1px 5px rgba(0, 0, 0, 0.1), inset 0px -1px 8px #9375B6, inset 0px 0px 3px #b5057a",
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },

},
plugins: [
  // require("daisyui"),
],
}

