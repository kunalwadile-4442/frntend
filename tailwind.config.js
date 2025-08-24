/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "primary-blue": "var(--primary-blue)",
        "primary-trans": "var(--primary-trans)",
        "secondary": "var(--secondary)",
        "primary-100": "var(--primary-100)",
        "secondary_1": "var(--secondary_1)",
        "tertiary": "var(--tertiary)",
        "error": "var(--error)",
        "text_secondary": "var(--text_secondary)",
        "custom_blue": "var(--custom_blue)",
        "body": "var(--body)",
        "border": "var(--border)",
        "secondary-100": "#858686",
        "table-tab": "var(--table-tab)",
        "sidebar-border": "var(--sidebar-border)",
        primary_300: "#EAF4F8",
        dropdown: "#4E4E4E",
        "h-table": "",
        table: "#fff",
        "avatar":"#6452CF",
      },
      borderColor: {
        dropdown: "#DFDFDF",
        table: "var(--table-border)",
      },
      borderRadius: {
        table: "var(--table-radius)",
        small:"6px"
      },
      boxShadow:{
        "table-tab":"var(--table-tab-shadow)",
        "sidebar":"var(--sidebar-shadow)",
        "header":"var(--header-shadow)",
        "custom": '0px 1px 2px rgba(0, 0, 0, 0.1)',
      }
    },
    fontFamily: {
      "sf-pro-display": ["SF Pro Display", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1880px",
      "4xl": "2480px",
    },
  },
  plugins: [

    function ({ addBase }) {
      addBase({
        ":root": {
          "--white": "#fff",
          "--table-bg": "#fff",
          "--table-header": "#347AE5",
          "--table-tab": "#E6E6E6",
          "--table-header-filter": "#F6F6F6",
          "--table-h-body": "#f2f5f7",
          "--table-toggle-bg": "#DFDFDF",
          "--table-border": "#E5E5E5",
          "--table-content-bg": "#F9F9F9",
          "--table-radius": "5px",
          "--primary": "#FFFFFF",
          "--primary-blue": "#0EADE5",

          "--primary-trans": "#0eade512",
          "--secondary": "#C8C9C9",
          "--sidebar-border":"#E5E5E5",
          "--primary-100": "#0C90BF",
          "--secondary_1": "#b0b0b05e",
          "--tertiary": "#F5F7F8",
          "--error": "#D1293D",
          "--text_secondary": "#6F7070",
          "--custom_blue": "#040C23",
          "--body": "#0B0B0B",
          "--border": "#E1E1E1",
          "--table-tab-shadow": "0px 0px 4px 0px #00000040",
          "--input-focus":"#3b82f6",
          "--sidebar-shadow":"0px 0px 8px 4px #6B6B940F",
          "--header-shadow":"15px 3px 11px 8px #6B6B940F",

        },
      });
    },
    function({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button': {
          '@apply appearance-none m-0': {},
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          '@apply appearance-none m-0': {},
        },
        'input[type="number"]': {
          '@apply [appearance:textfield]': {},
        },
      })
    }
  ],
};
