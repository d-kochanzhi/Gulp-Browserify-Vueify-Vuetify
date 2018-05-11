<template>
<div>
  <h2 class="comp-a">{{msg}}</h2>
  <span>{{fromPlugin()}}</span>
</div>
</template>

<script>
export default {
  name: "contacts",
  data() {
    return {
      msg: "Hello from component Contacts!"
    };
  },
  methods: {
    fromPlugin: function() {
      return Vue.myGlobalMethod();
    }
  }
};
</script>

<style scoped>
.comp-a {
  color: #ffaa00;
}
</style>