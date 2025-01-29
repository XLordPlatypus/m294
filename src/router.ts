import {createMemoryHistory, createRouter} from 'vue-router'

import kurse from './pages/kurse.vue'
import kurse_lernende from './pages/kurse_lernende.vue'
import laender from './pages/laender.vue'
import lehrbetrieb_lernende from './pages/lehrbetrieb_lernende.vue'
import lehrbetriebe from './pages/lehrbetriebe.vue'
import lernende from './pages/lernende.vue'
import home from './pages/home.vue'
import dozenten from "./pages/dozenten.vue";

const routes = [
    { path: '/', component: home },
    { path: '/dozenten', component: dozenten },
    { path: '/kurse', component: kurse },
    { path: '/kurse-lernende', component: kurse_lernende },
    { path: '/laender', component: laender },
    { path: '/lehrbetrieb-lernende', component: lehrbetrieb_lernende },
    { path: '/lehrbetriebe', component: lehrbetriebe },
    { path: '/lernende', component: lernende },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router