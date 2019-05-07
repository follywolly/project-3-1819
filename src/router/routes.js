import Logs from '../components/pages/Logs.vue'
import Runs from '../components/pages/Runs.vue'
import Overview from '../components/pages/Overview.vue'

const routes = [
  { path: '/logs', component: Logs },
  { path: '/runs', component: Runs },
  { path: '/overview', component: Overview },
]

export default routes
