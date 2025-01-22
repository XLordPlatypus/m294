import {createMemoryHistory, createRouter} from 'vue-router'

import dozenten from './components/dozenten.vue'
import kurse from './components/kurse.vue'
import kurse_lernende from './components/kurse_lernende.vue'
import laender from './components/laender.vue'
import lehrbetrieb_lernende from './components/lehrbetrieb_lernende.vue'
import lehrbetriebe from './components/lehrbetriebe.vue'
import lernende from './components/lernende.vue'

const routes = [
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