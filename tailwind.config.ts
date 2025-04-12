import { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#70C7BA",
        secondary: "#49EACB",
        tertiary: "#B6B6B6",
        "red-work": "rgba(255, 81, 81, 0.46)",
        "blue-work": "rgba(48, 140, 195, 0.46)",
        "dag-selected": "#00ff40",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-monospace", "SFMono-Regular"],
        rubik: ["Rubik", "ui-monospace", "SFMono-Regular"],
        lato: ["Lato", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
} satisfies Config;
