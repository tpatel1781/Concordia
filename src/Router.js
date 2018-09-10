import Vue from 'vue'
import Router from 'vue-router'
import SongPage from './components/SongPage.vue'
import Homepage from './components/Homepage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/songs/:name',
      name: 'songs',
      component: SongPage,
      props: true
    }
  ]
})