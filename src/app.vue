// app.vue
<style>
.red {
  color: #f00;
}
</style>

<template>
 <v-app id="inspire">
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list dense>
          <v-list-tile v-on:click="$router.push(item.route)" v-for="item in menuList" v-bind:key="item.icon">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>         
        </v-list>
      </v-navigation-drawer>
      <v-toolbar v-bind:color="colorTheme" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Gulp + Browserify + Vueify + Vuetify (full demo)</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>  
           <v-layout
            justify-center
            align-center>       
            <!-- отображение компонента, для которого совпал путь -->
            <router-view></router-view>
           </v-layout>
        </v-container>
      </v-content>
      <v-footer v-bind:color="colorTheme"  app inset>
        <span class="white--text">&copy; 2018</span>
      </v-footer>
    </v-app>
</template>

<script>
import Store from "./store.js";
import Mixins from "./mixin.js";

export default {
  mixins: [Mixins],
  data() {
    return {
      drawer: null,
      colorTheme : 'indigo'      
    };
  },
  computed: {
    menuList: function() {
      return this.$store.getters.menuList;
    }
  }
};
</script>