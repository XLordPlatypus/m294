import type {ThemeDefinition} from "vuetify";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

const customTheme: ThemeDefinition = {

}

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        // themes: {
        //     customTheme,
        // }
    },
    components,
    directives,
})