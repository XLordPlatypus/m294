import {createMemoryHistory, createRouter} from 'vue-router'

import dozenten from './components/pages/dozenten.vue'
import kurse from './components/pages/kurse.vue'
import kurse_lernende from './components/pages/kurse_lernende.vue'
import laender from './components/pages/laender.vue'
import lehrbetrieb_lernende from './components/pages/lehrbetrieb_lernende.vue'
import lehrbetriebe from './components/pages/lehrbetriebe.vue'
import lernende from './components/pages/lernende.vue'
import home from './components/pages/home.vue'

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