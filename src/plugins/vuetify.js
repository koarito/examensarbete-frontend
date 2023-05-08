import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#652d87",
          secondary: "#E94F7C",
        },
      },
      table: {
        colors: {
          surface: "#fab9cc",
          primary: "#652d87",
          secondary: "#E94F7C",
        },
      },
    },
  },
});
