import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      screens: {
        xxs: "320px",
        xs: "480px",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "night", "forest"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
