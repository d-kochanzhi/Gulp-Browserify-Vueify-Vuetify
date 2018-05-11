import home from './components/home.vue'
import contacts from './components/contacts.vue'

const routes = [
    { path: '/', component: home },
    { path: '/contacts', component: contacts }
  ]
   
  const router = new VueRouter({
    routes 
  })

  export default router