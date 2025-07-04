import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles/main.css";

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    components,
    directives,
})