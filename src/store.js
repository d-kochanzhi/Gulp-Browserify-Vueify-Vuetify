const store = new Vuex.Store({
  state: {
    msg: 'Hello from [Store]',
    menuList:[
      {title:'Главная', icon:'home', route:'/'},
      {title:'Контакты', icon:'contact_mail', route:'contacts'}
    ],   
  },
  getters: {
    msg: state => {
      return state.msg;
    },
    menuList: state => {
      return state.menuList;
    }
  }
})

export default store